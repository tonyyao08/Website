import { createServer } from 'node:http';
import { access, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const lineupsDirectory = resolve(root, 'src/data/valorant/lineups');
const mapsDirectory = resolve(root, 'src/data/valorant/maps');
const publicDirectory = resolve(root, 'public');
const editorHtml = await readFile(resolve(root, 'scripts/lineup-editor.html'));
const slugify = (value) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function locationsFrom(source) {
  return [...source.matchAll(/\{\s*id:\s*['\"]([^'\"]+)['\"],\s*label:\s*['\"]([^'\"]+)['\"],\s*type:\s*['\"](start|end)['\"],\s*(?:\/\/[^\n]*\n\s*)?position:\s*\{ x: ([\d.]+), y: ([\d.]+) \}/g)]
    .map(([, id, label, type, x, y]) => ({ id, label, type, position: { x: Number(x), y: Number(y) } }));
}

function mapIdFrom(value) {
  if (!/^[a-z0-9-]+$/.test(value || '')) throw new Error('Invalid map ID.');
  return value;
}
function mapFileFor(mapId) { return resolve(mapsDirectory, `${mapIdFrom(mapId)}.ts`); }
async function mapData(mapId) { return locationsFrom(await readFile(mapFileFor(mapId), 'utf8')); }
async function availableMaps() {
  const files = await readdir(mapsDirectory);
  return files.filter((file) => file.endsWith('.ts')).map((file) => {
    const id = file.slice(0, -3);
    return { id, name: id.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()) };
  });
}
async function exists(path) { try { await access(path); return true; } catch { return false; } }

async function uniqueId(base) {
  let id = base; let number = 2;
  while (await exists(resolve(lineupsDirectory, `${id}.ts`))) id = `${base}-${number++}`;
  return id;
}

const value = (source, key) => source.match(new RegExp(`${key}:\\s*['\"]([^'\"]*)['\"]`))?.[1] ?? '';
function parseLineup(source, file) {
  const object = {
    id: value(source, 'id'), title: value(source, 'title'), mapId: value(source, 'mapId'), side: value(source, 'side'), utility: value(source, 'utility'),
    startLocationId: value(source, 'startLocationId'), endLocationId: value(source, 'endLocationId'), file,
    stand: source.match(/stand:\s*\{\s*description:\s*['\"]([^'\"]*)['\"]/s)?.[1] ?? '',
    aim: source.match(/aim:\s*\{\s*description:\s*['\"]([^'\"]*)['\"]/s)?.[1] ?? '',
    result: value(source, 'result'), notes: source.match(/notes:\s*\[\s*['\"]([^'\"]*)/s)?.[1] ?? '', bounces: Number(source.match(/bounces:\s*(\d+)/)?.[1] ?? 0), charge: value(source, 'customChargeNote') || '3 charge',
    media: { standImage: value(source, 'standImage'), aimImage: value(source, 'aimImage'), resultImage: value(source, 'resultImage') },
  };
  return object.id && object.mapId ? object : null;
}
async function existingLineups(mapId) {
  const files = (await readdir(lineupsDirectory)).filter((file) => file.endsWith('.ts'));
  const lineups = (await Promise.all(files.map(async (file) => parseLineup(await readFile(resolve(lineupsDirectory, file), 'utf8'), file)))).filter(Boolean);
  return lineups.filter((lineup) => lineup.mapId === mapId);
}

function addNewLocations(source, locations) {
  if (!locations.length) return source;
  const records = locations.map((location) => `    {\n      id: '${location.id}',\n      label: ${JSON.stringify(location.label)},\n      type: '${location.type}',\n      position: { x: ${location.position.x}, y: ${location.position.y} },\n    },`).join('\n');
  const updated = source.replace(/\r?\n  \],\r?\n};/, `\n${records}\n  ],\n};`);
  if (updated === source) throw new Error('Could not insert the new map location.');
  return updated;
}

async function saveImage(image, mapId, folder, name) {
  if (!image?.data) return undefined;
  const extension = ['.png', '.jpg', '.jpeg', '.webp'].includes(extname(image.name || '').toLowerCase()) ? extname(image.name).toLowerCase() : '.png';
  const relative = `images/valorant/${mapId}/lineups/${folder}/${name}-${folder}${extension}`;
  await writeFile(resolve(root, 'public', relative), Buffer.from(image.data, 'base64'));
  return relative;
}

async function saveLineup(payload) {
  const { mapId = 'ascent', title, side, utility, stand, aim, result, notes = '', bounces = 0, charge = '3 charge', start, end, images = {}, existingId = '', existingMedia = {} } = payload;
  const safeMapId = mapIdFrom(mapId);
  const mapFile = mapFileFor(safeMapId);
  if (!title || !['attack', 'defense', 'all'].includes(side) || !['recon-dart', 'shock-dart'].includes(utility)) throw new Error('Complete the title, side, and utility fields.');
  if (!start?.id || !end?.id || !Number.isInteger(Number(bounces)) || Number(bounces) < 0) throw new Error('Choose both locations and a valid bounce count.');
  const currentSource = await readFile(mapFile, 'utf8');
  const existing = locationsFrom(currentSource);
  const additions = [start, end].filter((location) => !existing.some((item) => item.id === location.id));
  for (const location of additions) {
    if (!location.label || !['start', 'end'].includes(location.type) || !Number.isFinite(location.position?.x) || !Number.isFinite(location.position?.y)) throw new Error('New locations need a label and valid map coordinates.');
  }
  const base = slugify(`${safeMapId}-${side}-${utility.replace('-dart', '')}-${start.id}-to-${end.id}`);
  const id = existingId || await uniqueId(base);
  const folder = id;
  await mkdir(resolve(root, `public/images/valorant/${safeMapId}/lineups`, folder), { recursive: true });
  const standImage = await saveImage(images.stand, safeMapId, folder, 'stand') || existingMedia.standImage;
  const aimImage = await saveImage(images.aim, safeMapId, folder, 'aim') || existingMedia.aimImage;
  const resultImage = await saveImage(images.result, safeMapId, folder, 'result') || existingMedia.resultImage;
  const media = [standImage && `    standImage: '${standImage}',`, aimImage && `    aimImage: '${aimImage}',`, resultImage && `    resultImage: '${resultImage}',`].filter(Boolean);
  const source = `import type { Lineup } from '../types';\n\nconst lineup: Lineup = {\n  id: '${id}',\n  title: ${JSON.stringify(title)},\n  mapId: 'ascent',\n  side: '${side}',\n  utility: '${utility}',\n  startLocationId: '${start.id}',\n  endLocationId: '${end.id}',\n  stand: { description: ${JSON.stringify(stand)} },\n  aim: { description: ${JSON.stringify(aim)} },\n  mechanics: { bounces: ${Number(bounces)}, charge: 'custom', customChargeNote: ${JSON.stringify(charge)} },\n  notes: ${JSON.stringify(notes ? [notes] : [])},\n  result: ${JSON.stringify(result)},${media.length ? `\n  media: {\n${media.join('\n')}\n  },` : ''}\n  verified: false,\n};\n\nexport default lineup;\n`;
  const finalSource = source.replace("mapId: 'ascent'", `mapId: '${safeMapId}'`);
  await writeFile(mapFile, addNewLocations(currentSource, additions));
  await writeFile(resolve(lineupsDirectory, `${id}.ts`), finalSource);
  return id;
}

function reply(response, status, body, type = 'text/plain') { response.writeHead(status, { 'Content-Type': type }); response.end(body); }
const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://127.0.0.1:4322');
    if (request.method === 'GET' && url.pathname === '/') return reply(response, 200, editorHtml, 'text/html');
    if (request.method === 'GET' && url.pathname === '/api/maps') return reply(response, 200, JSON.stringify(await availableMaps()), 'application/json');
    if (request.method === 'GET' && url.pathname === '/api/map') return reply(response, 200, JSON.stringify(await mapData(url.searchParams.get('map') || 'ascent')), 'application/json');
    if (request.method === 'GET' && url.pathname === '/api/lineups') return reply(response, 200, JSON.stringify(await existingLineups(url.searchParams.get('map') || 'ascent')), 'application/json');
    if (request.method === 'GET' && url.pathname === '/minimap.png') return reply(response, 200, await readFile(resolve(root, `public/images/valorant/${mapIdFrom(url.searchParams.get('map') || 'ascent')}/minimap.png`)), 'image/png');
    if (request.method === 'GET' && url.pathname.startsWith('/images/')) {
      const file = resolve(publicDirectory, `.${url.pathname}`);
      if (!file.startsWith(publicDirectory)) throw new Error('Invalid image path.');
      return reply(response, 200, await readFile(file), `image/${extname(file).slice(1) || 'png'}`);
    }
    if (request.method === 'POST' && request.url === '/api/save') {
      let raw = ''; for await (const chunk of request) { raw += chunk; if (raw.length > 25_000_000) throw new Error('Images are too large (25 MB limit).'); }
      const id = await saveLineup(JSON.parse(raw));
      return reply(response, 201, JSON.stringify({ id }), 'application/json');
    }
    reply(response, 404, 'Not found');
  } catch (error) { reply(response, 400, JSON.stringify({ error: error.message }), 'application/json'); }
});
server.listen(4322, '127.0.0.1', () => console.log('Lineup editor ready at http://127.0.0.1:4322'));

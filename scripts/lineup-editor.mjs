import { createServer } from 'node:http';
import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const mapFile = resolve(root, 'src/data/valorant/maps/ascent.ts');
const lineupsDirectory = resolve(root, 'src/data/valorant/lineups');
const imagesDirectory = resolve(root, 'public/images/valorant/ascent/lineups');
const editorHtml = await readFile(resolve(root, 'scripts/lineup-editor.html'));
const slugify = (value) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function locationsFrom(source) {
  return [...source.matchAll(/\{\s*id: '([^']+)',\s*label: '([^']+)',\s*type: '(start|end)',\s*(?:\/\/[^\n]*\n\s*)?position: \{ x: ([\d.]+), y: ([\d.]+) \}/g)]
    .map(([, id, label, type, x, y]) => ({ id, label, type, position: { x: Number(x), y: Number(y) } }));
}

async function mapData() { return locationsFrom(await readFile(mapFile, 'utf8')); }
async function exists(path) { try { await access(path); return true; } catch { return false; } }

async function uniqueId(base) {
  let id = base; let number = 2;
  while (await exists(resolve(lineupsDirectory, `${id}.ts`))) id = `${base}-${number++}`;
  return id;
}

function addNewLocations(source, locations) {
  if (!locations.length) return source;
  const records = locations.map((location) => `    {\n      id: '${location.id}',\n      label: ${JSON.stringify(location.label)},\n      type: '${location.type}',\n      position: { x: ${location.position.x}, y: ${location.position.y} },\n    },`).join('\n');
  const updated = source.replace(/\n  \],\n};\s*$/, `\n${records}\n  ],\n};`);
  if (updated === source) throw new Error('Could not insert the new map location.');
  return updated;
}

async function saveImage(image, folder, name) {
  if (!image?.data) return undefined;
  const extension = ['.png', '.jpg', '.jpeg', '.webp'].includes(extname(image.name || '').toLowerCase()) ? extname(image.name).toLowerCase() : '.png';
  const relative = `images/valorant/ascent/lineups/${folder}/${name}${extension}`;
  await writeFile(resolve(root, 'public', relative), Buffer.from(image.data, 'base64'));
  return relative;
}

async function saveLineup(payload) {
  const { title, side, utility, stand, aim, result, notes = '', bounces = 0, charge = '3 charge', start, end, images = {} } = payload;
  if (!title || !stand || !aim || !result || !['attack', 'defense', 'all'].includes(side) || !['recon-dart', 'shock-dart'].includes(utility)) throw new Error('Complete the required lineup fields.');
  if (!start?.id || !end?.id || !Number.isInteger(Number(bounces)) || Number(bounces) < 0) throw new Error('Choose both locations and a valid bounce count.');
  const currentSource = await readFile(mapFile, 'utf8');
  const existing = locationsFrom(currentSource);
  const additions = [start, end].filter((location) => !existing.some((item) => item.id === location.id));
  for (const location of additions) {
    if (!location.label || !['start', 'end'].includes(location.type) || !Number.isFinite(location.position?.x) || !Number.isFinite(location.position?.y)) throw new Error('New locations need a label and valid map coordinates.');
  }
  const base = slugify(`ascent-${side}-${utility.replace('-dart', '')}-${start.id}-to-${end.id}`);
  const id = await uniqueId(base);
  const folder = id;
  await mkdir(resolve(imagesDirectory, folder), { recursive: true });
  const standImage = await saveImage(images.stand, folder, 'stand');
  const aimImage = await saveImage(images.aim, folder, 'aim');
  const resultImage = await saveImage(images.result, folder, 'result');
  const media = [standImage && `    standImage: '${standImage}',`, aimImage && `    aimImage: '${aimImage}',`, resultImage && `    resultImage: '${resultImage}',`].filter(Boolean);
  const source = `import type { Lineup } from '../types';\n\nconst lineup: Lineup = {\n  id: '${id}',\n  title: ${JSON.stringify(title)},\n  mapId: 'ascent',\n  side: '${side}',\n  utility: '${utility}',\n  startLocationId: '${start.id}',\n  endLocationId: '${end.id}',\n  stand: { description: ${JSON.stringify(stand)} },\n  aim: { description: ${JSON.stringify(aim)} },\n  mechanics: { bounces: ${Number(bounces)}, charge: 'custom', customChargeNote: ${JSON.stringify(charge)} },\n  notes: ${JSON.stringify(notes ? [notes] : [])},\n  result: ${JSON.stringify(result)},${media.length ? `\n  media: {\n${media.join('\n')}\n  },` : ''}\n  verified: false,\n};\n\nexport default lineup;\n`;
  await writeFile(mapFile, addNewLocations(currentSource, additions));
  await writeFile(resolve(lineupsDirectory, `${id}.ts`), source);
  return id;
}

function reply(response, status, body, type = 'text/plain') { response.writeHead(status, { 'Content-Type': type }); response.end(body); }
const server = createServer(async (request, response) => {
  try {
    if (request.method === 'GET' && request.url === '/') return reply(response, 200, editorHtml, 'text/html');
    if (request.method === 'GET' && request.url === '/api/map') return reply(response, 200, JSON.stringify(await mapData()), 'application/json');
    if (request.method === 'GET' && request.url === '/minimap.png') return reply(response, 200, await readFile(resolve(root, 'public/images/valorant/ascent/minimap.png')), 'image/png');
    if (request.method === 'POST' && request.url === '/api/save') {
      let raw = ''; for await (const chunk of request) { raw += chunk; if (raw.length > 25_000_000) throw new Error('Images are too large (25 MB limit).'); }
      const id = await saveLineup(JSON.parse(raw));
      return reply(response, 201, JSON.stringify({ id }), 'application/json');
    }
    reply(response, 404, 'Not found');
  } catch (error) { reply(response, 400, JSON.stringify({ error: error.message }), 'application/json'); }
});
server.listen(4322, '127.0.0.1', () => console.log('Lineup editor ready at http://127.0.0.1:4322'));

import { access, copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, extname, resolve } from 'node:path';
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

const root = resolve(import.meta.dirname, '..');
const lineupsDirectory = resolve(root, 'src/data/valorant/lineups');
const publicDirectory = resolve(root, 'public/images/valorant');
const rl = createInterface({ input: stdin, output: stdout });

const slugify = (value) => value.toLowerCase().trim()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const ask = async (label, fallback = '') => {
  const answer = await rl.question(`${label}${fallback ? ` [${fallback}]` : ''}: `);
  return answer.trim() || fallback;
};

async function fileExists(path) {
  try { await access(path); return true; } catch { return false; }
}

async function uniqueLineupId(baseId) {
  let id = baseId;
  let suffix = 2;
  while (await fileExists(resolve(lineupsDirectory, `${id}.ts`))) id = `${baseId}-${suffix++}`;
  return id;
}

async function selectLocation({ mapId, type, mapFile }) {
  const mapSource = await readFile(mapFile, 'utf8');
  const locationIds = [...mapSource.matchAll(/id: '([^']+)'/g)].map((match) => match[1]);
  console.log(`\nExisting ${type} locations: ${locationIds.join(', ') || 'none'}`);
  const selected = await ask(`Use an existing ${type} location ID, or type "new"`, 'new');
  if (selected !== 'new') {
    if (!locationIds.includes(selected)) throw new Error(`"${selected}" is not a location on ${mapId}. Choose an ID shown above or use "new".`);
    return { id: selected, addition: null };
  }

  const id = slugify(await ask(`New ${type} location ID (for example b-main)`));
  if (!id) throw new Error('Location ID cannot be empty.');
  if (locationIds.includes(id)) throw new Error(`Location "${id}" already exists.`);
  const label = await ask(`Visible label for ${id}`);
  const x = Number(await ask('Map X position as a percentage (0-100)'));
  const y = Number(await ask('Map Y position as a percentage (0-100)'));
  if (!label || !Number.isFinite(x) || !Number.isFinite(y) || x < 0 || x > 100 || y < 0 || y > 100) {
    throw new Error('Provide a label and X/Y percentages between 0 and 100.');
  }
  const callout = await ask('Optional callout (leave blank to skip)');
  return {
    id,
    addition: { id, label, type, x, y, callout },
  };
}

function locationCode(location) {
  return `    {\n      id: '${location.id}',\n      label: ${JSON.stringify(location.label)},\n      type: '${location.type}',\n      position: { x: ${location.x}, y: ${location.y} },${location.callout ? `\n      callout: ${JSON.stringify(location.callout)},` : ''}\n    },`;
}

async function addLocations(mapFile, additions) {
  if (!additions.length) return;
  const source = await readFile(mapFile, 'utf8');
  const replacement = `\n${additions.map(locationCode).join('\n')}\n  ],\n};`;
  const updated = source.replace(/\n  \],\n};\s*$/, replacement);
  if (updated === source) throw new Error(`Could not update ${basename(mapFile)} automatically.`);
  await writeFile(mapFile, updated);
}

async function copyImage(source, destinationFolder, name) {
  if (!source) return undefined;
  const input = resolve(source);
  if (!await fileExists(input)) throw new Error(`Image not found: ${input}`);
  const extension = extname(input).toLowerCase() || '.png';
  const output = resolve(destinationFolder, `${name}-${destinationFolder.split(/[\\/]/).at(-1)}${extension}`);
  await copyFile(input, output);
  return output.slice(resolve(root, 'public').length + 1).replaceAll('\\', '/');
}

try {
  console.log('Add a Valorant lineup. Image paths may be pasted from Explorer.\n');
  const mapId = await ask('Map ID', 'ascent');
  const mapFile = resolve(root, `src/data/valorant/maps/${mapId}.ts`);
  if (!await fileExists(mapFile)) throw new Error(`Map data file not found: ${mapFile}`);
  const title = await ask('Lineup title');
  const side = await ask('Side (attack, defense, all)', 'attack');
  const utility = await ask('Utility (recon-dart, shock-dart)', 'recon-dart');
  if (!title || !['attack', 'defense', 'all'].includes(side) || !['recon-dart', 'shock-dart'].includes(utility)) throw new Error('Enter a title and one of the listed side/utility values.');

  const start = await selectLocation({ mapId, type: 'start', mapFile });
  const end = await selectLocation({ mapId, type: 'end', mapFile });
  const baseId = slugify(`${mapId}-${side}-${utility.replace('-dart', '')}-${start.id}-to-${end.id}`);
  const id = await uniqueLineupId(baseId);
  const stand = await ask('Where to stand');
  const aim = await ask('Where to aim');
  const result = await ask('Result');
  const notes = await ask('Notes (optional)');
  const bounces = Number(await ask('Number of bounces', '0'));
  const charge = Number(await ask('Charge (0 to 3)', '3'));
  if (!stand || !aim || !result || !Number.isInteger(bounces) || bounces < 0 || !Number.isInteger(charge) || charge < 0 || charge > 3) throw new Error('Stand, aim, result, and valid bounce and charge counts are required.');

  const standSource = await ask('Stand image file path (optional)');
  const aimSource = await ask('Aim image file path (optional)');
  const resultSource = await ask('Result image file path (optional)');
  const imageFolder = resolve(publicDirectory, mapId, 'lineups', id);
  await mkdir(imageFolder, { recursive: true });
  const standImage = await copyImage(standSource, imageFolder, 'stand');
  const aimImage = await copyImage(aimSource, imageFolder, 'aim');
  const resultImage = await copyImage(resultSource, imageFolder, 'result');

  await addLocations(mapFile, [start.addition, end.addition].filter(Boolean));
  const mediaLines = [standImage && `    standImage: '${standImage}',`, aimImage && `    aimImage: '${aimImage}',`, resultImage && `    resultImage: '${resultImage}',`].filter(Boolean);
  const lineupSource = `import type { Lineup } from '../types';\n\nconst lineup: Lineup = {\n  id: '${id}',\n  title: ${JSON.stringify(title)},\n  mapId: '${mapId}',\n  side: '${side}',\n  utility: '${utility}',\n  startLocationId: '${start.id}',\n  endLocationId: '${end.id}',\n  stand: { description: ${JSON.stringify(stand)} },\n  aim: { description: ${JSON.stringify(aim)} },\n  mechanics: { bounces: ${bounces}, charge: ${charge} },\n  notes: ${JSON.stringify(notes ? [notes] : [])},\n  result: ${JSON.stringify(result)},${mediaLines.length ? `\n  media: {\n${mediaLines.join('\n')}\n  },` : ''}\n  verified: false,\n};\n\nexport default lineup;\n`;
  await writeFile(resolve(lineupsDirectory, `${id}.ts`), lineupSource);
  console.log(`\nCreated ${id}.ts and copied images to public/images/valorant/${mapId}/lineups/${id}/.`);
  console.log('Review the generated files, test the lineup in-game, then set verified: true and commit your changes.');
} catch (error) {
  console.error(`\nCould not create lineup: ${error.message}`);
  process.exitCode = 1;
} finally {
  rl.close();
}

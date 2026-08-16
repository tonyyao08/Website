import type { Lineup } from '../types';

/**
 * Data-shape example only. Replace its instructions with a tested lineup before
 * marking it verified or presenting it as playable content.
 */
const ascentExample: Lineup = {
  id: 'ascent-attack-recon-a-main-to-a-site-example',
  title: 'Example: A Main to A Site recon',
  mapId: 'ascent',
  side: 'attack',
  utility: 'recon-dart',
  startMarkerId: 'attacker-a-main',
  endMarkerId: 'a-site',
  stand: {
    description: 'Stand at the designated A Main start marker.',
    position: { x: 20, y: 72 },
  },
  aim: {
    description: 'Replace with the precise in-game aim reference.',
  },
  mechanics: {
    bounces: 0,
    charge: 'full',
    movement: 'standing',
  },
  notes: ['Template entry — verify every instruction in a custom game.'],
  result: 'Replace with the intended scan/result description.',
  verified: false,
};

export default ascentExample;

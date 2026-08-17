import type { Lineup } from '../types';

/**
 * First proof-of-concept lineup. Keep verified false until it has been tested.
 */
const ascentExample: Lineup = {
  id: 'ascent-attack-recon-b-main-to-b-site',
  title: 'B Main to B Site recon',
  mapId: 'ascent',
  side: 'attack',
  utility: 'recon-dart',
  startLocationId: 'b-main',
  endLocationId: 'b-site',
  stand: {
    description: 'Stand at the B Main start location.',
    position: { x: 22.4609375, y: 52.734375 },
  },
  aim: {
    description: 'Align in the middle of the line in the island image.',
  },
  mechanics: {
    bounces: 1,
    charge: 'custom',
    customChargeNote: '3 charge',
    movement: 'standing',
  },
  notes: ['Align in the middle of the line in the island image.'],
  result: 'Recon lands on B Site.',
  media: {
    standImage: 'images/valorant/ascent/lineups/recon-b-main-to-b-site/stand.png',
    aimImage: 'images/valorant/ascent/lineups/recon-b-main-to-b-site/aim.png',
    resultImage: 'images/valorant/ascent/lineups/recon-b-main-to-b-site/result.png',
  },
  verified: false,
};

export default ascentExample;

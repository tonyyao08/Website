import type { Lineup } from '../types';

const lineup: Lineup = {
  id: 'ascent-attack-recon-b-main-to-b-stairs',
  title: "B Main to Stairs",
  mapId: 'ascent',
  side: 'attack',
  utility: 'recon-dart',
  startLocationId: 'b-main',
  endLocationId: 'b-stairs',
  stand: { description: "" },
  aim: { description: "" },
  mechanics: { bounces: 1, charge: 'custom', customChargeNote: "3 charge" },
  notes: [],
  result: "",
  media: {
    standImage: 'images/valorant/ascent/lineups/ascent-attack-recon-b-main-to-b-stairs/stand.png',
    aimImage: 'images/valorant/ascent/lineups/ascent-attack-recon-b-main-to-b-stairs/aim.png',
    resultImage: 'images/valorant/ascent/lineups/ascent-attack-recon-b-main-to-b-stairs/result.png',
  },
  verified: false,
};

export default lineup;

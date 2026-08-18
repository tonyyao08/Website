import type { Lineup } from '../types';

const lineup: Lineup = {
  id: 'ascent-attack-recon-a-lobby-2-to-a-site-1',
  title: "A lobby to A site",
  mapId: 'ascent',
  side: 'attack',
  utility: 'recon-dart',
  startLocationId: 'a-lobby-2',
  endLocationId: 'a-site-1',
  stand: { description: "stand in corner of box in A lobby" },
  aim: { description: "alternatively aim at the bottom of the window" },
  mechanics: { bounces: 1, charge: 3 },
  notes: [],
  result: "",
  media: {
    standImage: 'images/valorant/ascent/lineups/ascent-attack-recon-a-lobby-2-to-a-site-1/stand-ascent-attack-recon-a-lobby-2-to-a-site-1.png',
    aimImage: 'images/valorant/ascent/lineups/ascent-attack-recon-a-lobby-2-to-a-site-1/aim-ascent-attack-recon-a-lobby-2-to-a-site-1.png',
    resultImage: 'images/valorant/ascent/lineups/ascent-attack-recon-a-lobby-2-to-a-site-1/result-ascent-attack-recon-a-lobby-2-to-a-site-1.png',
  },
  verified: false,
};

export default lineup;

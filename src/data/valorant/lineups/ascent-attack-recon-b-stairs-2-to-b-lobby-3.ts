import type { Lineup } from '../types';

const lineup: Lineup = {
  id: 'ascent-attack-recon-b-stairs-2-to-b-lobby-3',
  title: "b stairs to lobby",
  mapId: 'ascent',
  side: 'attack',
  utility: 'recon-dart',
  startLocationId: 'b-stairs-2',
  endLocationId: 'b-lobby-3',
  stand: { description: "stand next to wall and walk until you see the aiming spot" },
  aim: { description: "aim at the top left corner" },
  mechanics: { bounces: 1, charge: 3 },
  notes: [],
  result: "",
  media: {
    standImage: 'images/valorant/ascent/lineups/ascent-attack-recon-b-stairs-2-to-b-lobby-3/stand-ascent-attack-recon-b-stairs-2-to-b-lobby-3.png',
    aimImages: ["images/valorant/ascent/lineups/ascent-attack-recon-b-stairs-2-to-b-lobby-3/aim-1-ascent-attack-recon-b-stairs-2-to-b-lobby-3.png"],
    resultImage: 'images/valorant/ascent/lineups/ascent-attack-recon-b-stairs-2-to-b-lobby-3/result-ascent-attack-recon-b-stairs-2-to-b-lobby-3.png',
  },
  verified: false,
};

export default lineup;

import type { Lineup } from '../types';

const lineup: Lineup = {
  id: 'ascent-defense-recon-b-spawn-to-a-site',
  title: "A site from B spawn",
  mapId: 'ascent',
  side: 'defense',
  utility: 'recon-dart',
  startLocationId: 'b-spawn',
  endLocationId: 'a-site',
  stand: { description: "corner" },
  aim: { description: "left of building" },
  mechanics: { bounces: 0, charge: 2 },
  notes: [],
  result: "support dark on a",
  media: {
    standImage: 'images/valorant/ascent/lineups/ascent-defense-recon-b-spawn-to-a-site/stand-ascent-defense-recon-b-spawn-to-a-site.png',
    aimImages: ["images/valorant/ascent/lineups/ascent-defense-recon-b-spawn-to-a-site/aim-1-ascent-defense-recon-b-spawn-to-a-site.png"],
    resultImage: 'images/valorant/ascent/lineups/ascent-defense-recon-b-spawn-to-a-site/result-ascent-defense-recon-b-spawn-to-a-site.png',
  },
  verified: false,
};

export default lineup;

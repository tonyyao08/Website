import type { Lineup } from '../types';

const lineup: Lineup = {
  id: 'ascent-attack-shock-tiles-to-mid-market',
  title: "anti mid util",
  mapId: 'ascent',
  side: 'attack',
  utility: 'shock-dart',
  startLocationId: 'tiles',
  endLocationId: 'mid-market',
  stand: { description: "corner" },
  aim: { description: "" },
  mechanics: { bounces: 2, charge: 2 },
  notes: [],
  result: "breaks util",
  media: {
    standImage: 'images/valorant/ascent/lineups/ascent-attack-shock-tiles-to-mid-market/stand-ascent-attack-shock-tiles-to-mid-market.png',
    aimImages: ["images/valorant/ascent/lineups/ascent-attack-shock-tiles-to-mid-market/aim-1-ascent-attack-shock-tiles-to-mid-market.png"],
    resultImage: 'images/valorant/ascent/lineups/ascent-attack-shock-tiles-to-mid-market/result-ascent-attack-shock-tiles-to-mid-market.png',
  },
  verified: false,
};

export default lineup;

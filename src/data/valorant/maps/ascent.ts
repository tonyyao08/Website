import type { ValorantMap } from '../types';

const ascent: ValorantMap = {
  id: 'ascent',
  name: 'Ascent',
  image: 'images/valorant/ascent/minimap.png',
  locations: [
    {
      id: 'b-main',
      label: 'B Main',
      type: 'start',
      // Source image is 2048 × 2048. Coordinates supplied: 460 × 1080.
      position: { x: 22.4609375, y: 52.734375 },
      callout: 'Attacker side',
    },
    {
      id: 'b-site',
      label: 'B Site',
      type: 'end',
      // Source image is 2048 × 2048. Coordinates supplied: 750 × 500.
      position: { x: 36.62109375, y: 24.4140625 },
      callout: 'Site',
    },
    {
      id: 'b-stairs',
      label: "B stairs",
      type: 'end',
      position: { x: 32.716, y: 20.7115 },
    },
  ],
};

export default ascent;

import type { ValorantMap } from '../types';

const ascent: ValorantMap = {
  id: 'ascent',
  name: 'Ascent',
  image: 'images/valorant/ascent/minimap.png',
  locations: [
    {
      id: 'b-main',
      label: 'B Main',
      // Placeholder location — adjust once we calibrate map coordinates in the final UI.
      position: { x: 73, y: 57 },
      callout: 'Attacker side',
    },
    {
      id: 'b-site',
      label: 'B Site',
      // Placeholder location — adjust once we calibrate map coordinates in the final UI.
      position: { x: 77, y: 39 },
      callout: 'Site',
    },
  ],
};

export default ascent;

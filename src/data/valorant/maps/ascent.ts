import type { ValorantMap } from '../types';

const ascent: ValorantMap = {
  id: 'ascent',
  name: 'Ascent',
  image: null,
  markers: [
    {
      id: 'attacker-a-main',
      label: 'A Main',
      kind: 'start',
      position: { x: 20, y: 72 },
      callout: 'Attacker side',
    },
    {
      id: 'a-site',
      label: 'A Site',
      kind: 'end',
      position: { x: 42, y: 65 },
    },
    {
      id: 'defender-a-site',
      label: 'A Site',
      kind: 'start',
      position: { x: 42, y: 65 },
      callout: 'Defender side',
    },
    {
      id: 'a-main',
      label: 'A Main',
      kind: 'end',
      position: { x: 20, y: 72 },
    },
  ],
};

export default ascent;

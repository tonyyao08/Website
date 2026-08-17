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
    {
      id: 'cat',
      label: "cat",
      type: 'start',
      position: { x: 59.5679, y: 43.8816 },
    },
    {
      id: 'a-site-1',
      label: "A-site-1",
      type: 'end',
      position: { x: 81.0957, y: 26.8587 },
    },
    {
      id: 'a-lobby-1',
      label: "A lobby 1",
      type: 'start',
      position: { x: 75.4244, y: 60.5019 },
    },
    {
      id: 'a-lobby-2',
      label: "A lobby 2",
      type: 'start',
      position: { x: 75.5401, y: 51.8213 },
    },
    {
      id: 'a-lobby-3',
      label: "A lobby 2",
      type: 'start',
      position: { x: 71.3735, y: 58.5086 },
    },
    {
      id: 'a-site-close-right',
      label: "A site close right",
      type: 'end',
      position: { x: 87.8086, y: 41.8419 },
    },
    {
      id: 'cypher-b-site',
      label: "cypher b site",
      type: 'end',
      position: { x: 35.9568, y: 35.5919 },
    },
  ],
};

export default ascent;

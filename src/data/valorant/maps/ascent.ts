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
      label: "A lobby",
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
    {
      id: 'a-site-left',
      label: "a-site-left",
      type: 'end',
      position: { x: 82.3688, y: 41.8419 },
    },
    {
      id: 'a-heaven',
      label: "A heaven",
      type: 'start',
      position: { x: 84.2207, y: 26.1011 },
    },
    {
      id: 'a-main-1',
      label: "A main",
      type: 'end',
      position: { x: 69.9846, y: 64.0641 },
    },
    {
      id: 'a-window',
      label: "a-window",
      type: 'start',
      position: { x: 70.4475, y: 27.0142 },
    },
    {
      id: 'market',
      label: "Market",
      position: { x: 42.4383, y: 32.454 },
    },
    {
      id: 'b-site-logs',
      label: "B site logs",
      position: { x: 37.8086, y: 31.2966 },
    },
    {
      id: 'b-lane',
      label: "b lane",
      position: { x: 22.6466, y: 33.7272 },
    },
    {
      id: 'b-lobby-2',
      label: "b lobby 2",
      position: { x: 31.2114, y: 61.8522 },
    },
    {
      id: 'b-stairs-2',
      label: "b stairs 2",
      position: { x: 28.5494, y: 21.3558 },
    },
    {
      id: 'b-lobby-3',
      label: "b lobby 3",
      position: { x: 22.2994, y: 61.5178 },
    },
    {
      id: 'tiles',
      label: "tiles",
      position: { x: 38.5031, y: 49.111 },
    },
    {
      id: 'mid-market',
      label: "mid market",
      position: { x: 50.7716, y: 35.2222 },
    },
    {
      id: 'b-spawn',
      label: "B spawn",
      position: { x: 32.4846, y: 15.0833 },
    },
    {
      id: 'a-site',
      label: "A site",
      position: { x: 91.3966, y: 33.8333 },
    },
  ],
};

export default ascent;

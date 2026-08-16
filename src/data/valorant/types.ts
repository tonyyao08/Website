export type MapId = 'ascent';
export type TeamSide = 'attack' | 'defense';
export type Utility = 'recon-dart' | 'shock-dart';
export type MarkerKind = 'start' | 'end';

/** Coordinates are percentages of the map image: (0, 0) is its top-left corner. */
export interface MapPosition {
  x: number;
  y: number;
}

export interface MapMarker {
  id: string;
  label: string;
  kind: MarkerKind;
  position: MapPosition;
  callout?: string;
}

export interface ValorantMap {
  id: MapId;
  name: string;
  /** Add a top-down map image here when assets are licensed and ready. */
  image: string | null;
  markers: MapMarker[];
}

export interface LineupMedia {
  standImage?: string;
  aimImage?: string;
  resultImage?: string;
  videoUrl?: string;
}

export interface Lineup {
  id: string;
  title: string;
  mapId: MapId;
  side: TeamSide;
  utility: Utility;
  /** Marker IDs on the map. These two fields define the selectable map line. */
  startMarkerId: string;
  endMarkerId: string;
  /** The actual standing location; usually matches the start marker. */
  stand: {
    description: string;
    position: MapPosition;
  };
  aim: {
    description: string;
    position?: MapPosition;
  };
  mechanics: {
    bounces: number;
    charge: 'full' | 'half' | 'tap' | 'custom';
    customChargeNote?: string;
    movement?: 'standing' | 'walk' | 'run' | 'jump';
  };
  notes: string[];
  result: string;
  media?: LineupMedia;
  /** Keep false while an entry is only a draft or has not been tested in-game. */
  verified: boolean;
}

export interface LineupFilters {
  mapId?: MapId;
  side?: TeamSide;
  utility?: Utility;
}

export type MapId = 'ascent';
export type TeamSide = 'all' | 'attack' | 'defense';
export type LocationType = 'start' | 'end';
export type Utility = 'recon-dart' | 'shock-dart';

/** Coordinates are percentages of the map image: (0, 0) is its top-left corner. */
export interface MapPosition {
  x: number;
  y: number;
}

/** A reusable, named point on a map. Many lineups may refer to the same location. */
export interface MapLocation {
  id: string;
  label: string;
  type: LocationType;
  position: MapPosition;
  callout?: string;
}

export interface ValorantMap {
  id: MapId;
  name: string;
  /** Add a top-down map image here when assets are licensed and ready. */
  image: string | null;
  locations: MapLocation[];
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
  /** Reusable location IDs on the map. Together, they define the selectable map line. */
  startLocationId: string;
  endLocationId: string;
  /** The actual standing location; usually matches the start location. */
  stand: {
    description: string;
    position?: MapPosition;
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

import ascent from './maps/ascent';
import type { Lineup, LineupFilters, MapId, MapLocation, ValorantMap } from './types';

const lineupModules = import.meta.glob<{ default: Lineup }>('./lineups/*.ts', {
  eager: true,
});

export const maps: ValorantMap[] = [ascent];
export const lineups: Lineup[] = Object.values(lineupModules).map((module) => module.default);

export function getMap(mapId: MapId): ValorantMap | undefined {
  return maps.find((map) => map.id === mapId);
}

export function getLineups(filters: LineupFilters = {}): Lineup[] {
  return lineups.filter((lineup) =>
    (!filters.mapId || lineup.mapId === filters.mapId) &&
    (!filters.side || lineup.side === filters.side) &&
    (!filters.utility || lineup.utility === filters.utility),
  );
}

/**
 * The future map UI calls this after a user selects one marker. It returns only
 * the connections that touch that marker, which is exactly the line-visibility rule.
 */
export function getLineupsForLocation(
  mapId: MapId,
  locationId: string,
  filters: Omit<LineupFilters, 'mapId'> = {},
): Lineup[] {
  return getLineups({ ...filters, mapId }).filter(
    (lineup) => lineup.startLocationId === locationId || lineup.endLocationId === locationId,
  );
}

export function getOppositeLocation(lineup: Lineup, selectedLocationId: string): MapLocation | undefined {
  const map = getMap(lineup.mapId);
  if (!map) return undefined;

  const oppositeId = lineup.startLocationId === selectedLocationId
    ? lineup.endLocationId
    : lineup.startLocationId;

  return map.locations.find((location) => location.id === oppositeId);
}

export type { Lineup, LineupFilters, LocationType, MapId, MapLocation, MapPosition, TeamSide, Utility, ValorantMap } from './types';

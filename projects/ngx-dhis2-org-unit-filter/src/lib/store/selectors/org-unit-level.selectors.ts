import { createSelector } from '@ngrx/store';
import {
  getOrgUnitFilterState,
  OrgUnitFilterState,
} from '../reducers/org-unit-filter.reducer';
import {
  getOrgUnitLevelLoadedState,
  getOrgUnitLevelLoadingState,
  getOrgUnitLevelLoadInitiatedState,
  selectAllOrgUnitLevels,
} from '../reducers/org-unit-level.reducer';

export const getOrgUnitLevelState = createSelector(
  getOrgUnitFilterState,
  (state: OrgUnitFilterState) => state.orgUnitLevel
);

export const getOrgUnitLevelLoadInitiated = createSelector(
  getOrgUnitLevelState,
  getOrgUnitLevelLoadInitiatedState
);

export const getOrgUnitLevelLoaded = createSelector(
  getOrgUnitLevelState,
  getOrgUnitLevelLoadedState
);

export const getOrgUnitLevelLoading = createSelector(
  getOrgUnitLevelState,
  getOrgUnitLevelLoadingState
);

export const getOrgUnitLevels = createSelector(
  getOrgUnitLevelState,
  selectAllOrgUnitLevels
);

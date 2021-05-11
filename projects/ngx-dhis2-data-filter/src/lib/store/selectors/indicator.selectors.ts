import { createSelector } from '@ngrx/store';
import {
  getDataFilterState,
  DataFilterState
} from '../reducers/data-filter.reducer';
import { adapter, IndicatorState } from '../reducers/indicator.reducer';

export const getIndicatorState = createSelector(
  getDataFilterState,
  (state: DataFilterState) => state.indicator
);

export const {
  selectEntities: getIndicatorEntities,
  selectAll: getIndicators
} = adapter.getSelectors(getIndicatorState);

export const getIndicatorsInitiatedStatus = createSelector(
  getIndicatorState,
  (state: IndicatorState) => state.loadInitiated
);

export const getIndicatorsLoadingStatus = createSelector(
  getIndicatorState,
  (state: IndicatorState) => state.loading
);

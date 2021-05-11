import { createSelector } from '@ngrx/store';
import {
  getDataFilterState,
  DataFilterState
} from '../reducers/data-filter.reducer';
import { adapter, DataElementState } from '../reducers/data-element.reducer';

export const getDataElementState = createSelector(
  getDataFilterState,
  (state: DataFilterState) => state.dataElement
);

export const {
  selectEntities: getDataElementEntities,
  selectAll: getDataElements
} = adapter.getSelectors(getDataElementState);

export const getDataElementsInitiatedStatus = createSelector(
  getDataElementState,
  (state: DataElementState) => state.loadInitiated
);

export const getDataElementsLoadingStatus = createSelector(
  getDataElementState,
  (state: DataElementState) => state.loading
);

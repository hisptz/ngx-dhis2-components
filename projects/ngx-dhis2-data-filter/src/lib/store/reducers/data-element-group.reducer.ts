import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { DataElementGroup } from '../../models/data-element-group.model';
import {
  addDataElementGroup,
  addDataElementGroups,
  deleteDataElementGroup,
  loadDataElementGroups,
  loadDataElementGroupsInitiated,
  updateDataElementGroup,
  loadDataElementGroupsFail
} from '../actions/data-element-group.actions';

export interface DataElementGroupState extends EntityState<DataElementGroup> {
  // additional entities state properties
  loading: boolean;
  loaded: boolean;
  hasError: boolean;
  error: any;
  loadInitiated: boolean;
}

export const adapter: EntityAdapter<DataElementGroup> = createEntityAdapter<
  DataElementGroup
>();

export const initialState: DataElementGroupState = adapter.getInitialState({
  // additional entity state properties
  loading: false,
  loaded: false,
  loadInitiated: false,
  hasError: false,
  error: null
});

const reducer = createReducer(
  initialState,
  on(loadDataElementGroupsInitiated, state => ({
    ...state,
    loadInitiated: true
  })),
  on(addDataElementGroup, (state, { dataElementGroup }) =>
    adapter.addOne(dataElementGroup, state)
  ),
  on(addDataElementGroups, (state, { dataElementGroups }) =>
    adapter.addMany(dataElementGroups, state)
  ),
  on(updateDataElementGroup, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, state)
  ),
  on(deleteDataElementGroup, (state, { id }) => adapter.removeOne(id, state)),
  on(loadDataElementGroups, state => ({
    ...state,
    loading: state.loaded ? false : true,
    loaded: state.loaded,
    hasError: false,
    error: null
  })),
  on(loadDataElementGroupsFail, (state, { error }) => ({
    ...state,
    loaded: true,
    error,
    hasError: true
  }))
);

export function dataElementGroupReducer(state, action): DataElementGroupState {
  return reducer(state, action);
}

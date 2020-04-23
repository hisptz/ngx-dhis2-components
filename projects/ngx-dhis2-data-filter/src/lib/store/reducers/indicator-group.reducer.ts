import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { IndicatorGroup } from '../../models/indicator-group.model';
import {
  addIndicatorGroup,
  addIndicatorGroups,
  deleteIndicatorGroup,
  loadIndicatorGroups,
  loadIndicatorGroupsInitiated,
  updateIndicatorGroup,
  loadIndicatorGroupsFail
} from '../actions/indicator-group.actions';

export interface IndicatorGroupState extends EntityState<IndicatorGroup> {
  // additional entities state properties
  loading: boolean;
  loaded: boolean;
  hasError: boolean;
  error: any;
  loadInitiated: boolean;
}

export const adapter: EntityAdapter<IndicatorGroup> = createEntityAdapter<
  IndicatorGroup
>();

export const initialState: IndicatorGroupState = adapter.getInitialState({
  // additional entity state properties
  loading: false,
  loaded: false,
  loadInitiated: false,
  hasError: false,
  error: null
});

const reducer = createReducer(
  initialState,
  on(loadIndicatorGroupsInitiated, state => ({
    ...state,
    loadInitiated: true
  })),
  on(addIndicatorGroup, (state, { indicatorGroup }) =>
    adapter.addOne(indicatorGroup, state)
  ),
  on(addIndicatorGroups, (state, { indicatorGroups }) =>
    adapter.addMany(indicatorGroups, state)
  ),
  on(updateIndicatorGroup, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, state)
  ),
  on(deleteIndicatorGroup, (state, { id }) => adapter.removeOne(id, state)),
  on(loadIndicatorGroups, state => ({
    ...state,
    loading: state.loaded ? false : true,
    loaded: state.loaded,
    hasError: false,
    error: null
  })),
  on(loadIndicatorGroupsFail, (state, { error }) => ({
    ...state,
    loaded: true,
    error,
    hasError: true
  }))
);

export function indicatorGroupReducer(state, action): IndicatorGroupState {
  return reducer(state, action);
}

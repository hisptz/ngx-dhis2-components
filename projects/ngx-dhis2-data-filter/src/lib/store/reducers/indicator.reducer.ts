import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { Indicator } from '../../models/indicator.model';
import {
  addIndicator,
  addIndicators,
  deleteIndicator,
  loadIndicators,
  loadIndicatorsInitiated,
  updateIndicator,
  loadIndicatorsFail
} from '../actions/indicator.actions';

export interface IndicatorState extends EntityState<Indicator> {
  // additional entities state properties
  loading: boolean;
  loaded: boolean;
  hasError: boolean;
  error: any;
  loadInitiated: boolean;
}

export const adapter: EntityAdapter<Indicator> = createEntityAdapter<
  Indicator
>();

export const initialState: IndicatorState = adapter.getInitialState({
  // additional entity state properties
  loading: false,
  loaded: false,
  loadInitiated: false,
  hasError: false,
  error: null
});

const reducer = createReducer(
  initialState,
  on(loadIndicatorsInitiated, state => ({ ...state, loadInitiated: true })),
  on(addIndicator, (state, { indicator }) => adapter.addOne(indicator, state)),
  on(addIndicators, (state, { indicators }) =>
    adapter.addMany(indicators, state)
  ),
  on(updateIndicator, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, state)
  ),
  on(deleteIndicator, (state, { id }) => adapter.removeOne(id, state)),
  on(loadIndicators, state => ({
    ...state,
    loading: state.loaded ? false : true,
    loaded: state.loaded,
    hasError: false,
    error: null
  })),
  on(loadIndicatorsFail, (state, { error }) => ({
    ...state,
    loaded: true,
    error,
    hasError: true
  }))
);

export function indicatorReducer(state, action): IndicatorState {
  return reducer(state, action);
}

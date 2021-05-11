import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { DataElement } from '../../models/data-element.model';
import {
  addDataElement,
  addDataElements,
  deleteDataElement,
  loadDataElements,
  loadDataElementsInitiated,
  updateDataElement,
  loadDataElementsFail
} from '../actions/data-element.actions';

export interface DataElementState extends EntityState<DataElement> {
  // additional entities state properties
  loading: boolean;
  loaded: boolean;
  hasError: boolean;
  error: any;
  loadInitiated: boolean;
}

export const adapter: EntityAdapter<DataElement> = createEntityAdapter<
  DataElement
>();

export const initialState: DataElementState = adapter.getInitialState({
  // additional entity state properties
  loading: false,
  loaded: false,
  loadInitiated: false,
  hasError: false,
  error: null
});

const reducer = createReducer(
  initialState,
  on(loadDataElementsInitiated, state => ({ ...state, loadInitiated: true })),
  on(addDataElement, (state, { dataElement }) =>
    adapter.addOne(dataElement, state)
  ),
  on(addDataElements, (state, { dataElements }) =>
    adapter.addMany(dataElements, state)
  ),
  on(updateDataElement, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, state)
  ),
  on(deleteDataElement, (state, { id }) => adapter.removeOne(id, state)),
  on(loadDataElements, state => ({
    ...state,
    loading: state.loaded ? false : true,
    loaded: state.loaded,
    hasError: false,
    error: null
  })),
  on(loadDataElementsFail, (state, { error }) => ({
    ...state,
    loaded: true,
    error,
    hasError: true
  }))
);

export function dataElementReducer(state, action): DataElementState {
  return reducer(state, action);
}

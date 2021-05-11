import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { find } from 'lodash';

import { FunctionObject } from '../../models/function.model';
import {
  addFunction,
  addFunctions,
  updateFunction,
  loadFunctionsInitialized,
  deleteFunction
} from '../actions/function.actions';
import { createReducer, on } from '@ngrx/store';

export interface FunctionState extends EntityState<FunctionObject> {
  // additional entities state properties
  loading: boolean;
  loaded: boolean;
  hasError: boolean;
  error: any;
  loadInitiated: boolean;
  activeFunctionId: string;
}

export const adapter: EntityAdapter<FunctionObject> = createEntityAdapter<
  FunctionObject
>();

export const initialState: FunctionState = adapter.getInitialState({
  // additional entity state properties
  loading: false,
  loaded: false,
  loadInitiated: false,
  hasError: false,
  error: null,
  activeFunctionId: ''
});

const reducer = createReducer(
  initialState,
  on(loadFunctionsInitialized, state => ({ ...state, loadInitiated: true })),
  on(addFunction, (state, { functionObject }) =>
    adapter.addOne(functionObject, state)
  ),
  on(addFunctions, (state, { functions }) => {
    const selectedFunction = find(functions, ['selected', true]);
    return adapter.addMany(functions, {
      ...state,
      loaded: true,
      loading: false,
      activeFunctionId: selectedFunction
        ? selectedFunction.id
        : functions && functions[0]
        ? functions[0].id
        : ''
    });
  }),
  on(updateFunction, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, state)
  ),
  on(deleteFunction, (state, { id }) => adapter.removeOne(id, state))
);

export function functionReducer(state, action) {
  return reducer(state, action);
}

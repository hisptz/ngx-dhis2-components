import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { find } from 'lodash';

import { FunctionRule } from '../../models/function-rule.model';
import {
  addFunctionRule,
  addFunctionRules,
  deleteFunctionRule,
  setActiveFunctionRule,
  updateActiveFunctionRule,
  updateFunctionRule
} from '../actions/function-rule.actions';

export interface FunctionRuleState extends EntityState<FunctionRule> {
  // additional entities state properties
  activeFunctionRuleId: string;
}

export const adapter: EntityAdapter<FunctionRule> = createEntityAdapter<
  FunctionRule
>();

export const initialState: FunctionRuleState = adapter.getInitialState({
  // additional entity state properties
  activeFunctionRuleId: ''
});

const reducer = createReducer(
  initialState,
  on(addFunctionRule, (state, { functionRule }) =>
    adapter.addOne(functionRule, state)
  ),
  on(addFunctionRules, (state, { functionRules }) => {
    const selectedFunctionRule = find(functionRules, ['selected', true]);
    return adapter.addMany(functionRules, {
      ...state,
      activeFunctionRuleId: selectedFunctionRule
        ? selectedFunctionRule.id
        : functionRules && functionRules[0]
        ? functionRules[0].id
        : ''
    });
  }),
  on(updateFunctionRule, (state, { id, changes }) =>
    adapter.updateOne({ id, changes }, state)
  ),
  on(deleteFunctionRule, (state, { id }) => adapter.removeOne(id, state)),
  on(setActiveFunctionRule, (state, { functionRuleId }) =>
    functionRuleId ? { ...state, activeFunctionRuleId: functionRuleId } : state
  ),
  on(updateActiveFunctionRule, state => {
    const activeFunctionRuleId = state.activeFunctionRuleId;
    return activeFunctionRuleId !== ''
      ? adapter.updateOne(
          { id: activeFunctionRuleId, changes: { simulating: false } },
          state
        )
      : state;
  })
);

export function functionRuleReducer(state, action): FunctionRuleState {
  return reducer(state, action);
}

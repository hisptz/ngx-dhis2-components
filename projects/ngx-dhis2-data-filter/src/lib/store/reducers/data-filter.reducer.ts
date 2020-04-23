import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import {
  dataElementGroupReducer,
  DataElementGroupState
} from './data-element-group.reducer';
import { dataElementReducer, DataElementState } from './data-element.reducer';
import {
  dataFilterConfigReducer,
  DataFilterConfigState
} from './data-filter-config.reducer';
import {
  functionRuleReducer,
  FunctionRuleState
} from './function-rule.reducer';
import { functionReducer, FunctionState } from './function.reducer';
import {
  indicatorGroupReducer,
  IndicatorGroupState
} from './indicator-group.reducer';
import { indicatorReducer, IndicatorState } from './indicator.reducer';

export interface DataFilterState {
  filterConfig: DataFilterConfigState;
  function: FunctionState;
  functionRule: FunctionRuleState;
  indicatorGroup: IndicatorGroupState;
  indicator: IndicatorState;
  dataElementGroup: DataElementGroupState;
  dataElement: DataElementState;
}

export const dataFilterReducer: ActionReducerMap<DataFilterState> = {
  filterConfig: dataFilterConfigReducer,
  function: functionReducer,
  functionRule: functionRuleReducer,
  indicatorGroup: indicatorGroupReducer,
  indicator: indicatorReducer,
  dataElementGroup: dataElementGroupReducer,
  dataElement: dataElementReducer
};

export const getDataFilterState = createFeatureSelector<DataFilterState>(
  'dataFilter'
);

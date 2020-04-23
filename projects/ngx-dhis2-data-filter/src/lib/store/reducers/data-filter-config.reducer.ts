import { createReducer, on } from '@ngrx/store';
import { map, filter } from 'lodash';
import {
  updateActiveDataFilterSelections,
  setCurrentDataFilterGroup
} from '../actions/data-filter.actions';

export interface DataFilterConfigState {
  activeDataFilterSelections: string[];
  currentDataFilterGroupId: string;
}

const initialFilterConfigState: DataFilterConfigState = {
  activeDataFilterSelections: ['all'],
  currentDataFilterGroupId: 'all'
};

const reducer = createReducer(
  initialFilterConfigState,
  on(updateActiveDataFilterSelections, (state, { dataFilterSelections }) => ({
    ...state,
    activeDataFilterSelections: map(
      filter(
        dataFilterSelections,
        (dataSelection: any) => dataSelection.selected
      ),
      (dataSelection: any) => dataSelection.prefix
    )
  })),
  on(setCurrentDataFilterGroup, (state, { currentDataFilterGroupId }) => ({
    ...state,
    currentDataFilterGroupId
  }))
);

export function dataFilterConfigReducer(state, action) {
  return reducer(state, action);
}

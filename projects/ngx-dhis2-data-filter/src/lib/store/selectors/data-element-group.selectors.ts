import { createSelector } from '@ngrx/store';
import { map, filter } from 'lodash';

import { DataElementGroup } from '../../models/data-element-group.model';
import { DataElement } from '../../models/data-element.model';
import {
  getDataFilterState,
  DataFilterState
} from '../reducers/data-filter.reducer';
import {
  adapter,
  DataElementGroupState
} from '../reducers/data-element-group.reducer';
import { getDataElementEntities } from './data-element.selectors';

const getDataElementGroupState = createSelector(
  getDataFilterState,
  (state: DataFilterState) => state.dataElementGroup
);

export const { selectAll: getAllDataElementGroups } = adapter.getSelectors(
  getDataElementGroupState
);

export const getDataElementGroupsInitiatedStatus = createSelector(
  getDataElementGroupState,
  (state: DataElementGroupState) => state.loadInitiated
);

export const getDataElementGroupsLoadingStatus = createSelector(
  getDataElementGroupState,
  (state: DataElementGroupState) => state.loading
);

export const getDataElementGroups = createSelector(
  getAllDataElementGroups,
  getDataElementEntities,
  (
    dataElementGroups: DataElementGroup[],
    dataElementEntities: { [id: string]: DataElement }
  ) => {
    return map(dataElementGroups, (dataElementGroup: DataElementGroup) => {
      return {
        id: dataElementGroup.id,
        name: dataElementGroup.name,
        items: filter(
          map(
            dataElementGroup.dataElements || [],
            (dataElementId: string) => dataElementEntities[dataElementId]
          ),
          dataElement => dataElement
        )
      };
    });
  }
);

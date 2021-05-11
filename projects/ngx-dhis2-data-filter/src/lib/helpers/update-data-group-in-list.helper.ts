import { DataGroup } from '../models/data-group.model';
import { find, slice } from 'lodash';

export function updateDataGroupInList(
  dataGroups: DataGroup[],
  dataGroupToUpdate: DataGroup
): DataGroup[] {
  const dataGroupIndex = (dataGroups || []).indexOf(
    find(dataGroups, ['id', dataGroupToUpdate ? dataGroupToUpdate.id : ''])
  );

  return dataGroupIndex !== -1
    ? [
        ...slice(dataGroups, 0, dataGroupIndex),
        dataGroupToUpdate,
        ...slice(dataGroups, dataGroupIndex + 1)
      ]
    : dataGroups;
}

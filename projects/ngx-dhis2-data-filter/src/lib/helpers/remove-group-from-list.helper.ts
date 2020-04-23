import { DataGroup } from '../models/data-group.model';
import { slice, find } from 'lodash';

export function removeGroupFromList(
  dataGroups: DataGroup[],
  groupToDelete: DataGroup
): DataGroup[] {
  const newDataGroups = dataGroups || [];
  const groupToDeleteIndex = newDataGroups.indexOf(
    find(dataGroups, ['id', groupToDelete ? groupToDelete.id : ''])
  );

  return groupToDeleteIndex > -1
    ? [
        ...slice(newDataGroups, 0, groupToDeleteIndex),
        ...slice(newDataGroups, groupToDeleteIndex + 1)
      ]
    : newDataGroups;
}

import { DataGroup } from '../models/data-group.model';
import { map, flatten, find } from 'lodash';

export function getDataGroupBasedOnDataItem(
  dataGroups: DataGroup[],
  dataItem: any
) {
  if (!dataItem) {
    return null;
  }
  const dataItems = flatten(
    map(dataGroups || [], (dataGroup: DataGroup) => {
      return map(dataGroup.members || [], member => {
        return {
          ...member,
          groupId: dataGroup.id
        };
      });
    })
  );

  const dataItemWithGroup = find(dataItems, ['id', dataItem.id]);

  return find(dataGroups, [
    'id',
    dataItemWithGroup ? dataItemWithGroup.groupId : undefined
  ]);
}

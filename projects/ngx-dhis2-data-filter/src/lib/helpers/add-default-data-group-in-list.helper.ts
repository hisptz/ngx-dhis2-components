import { map } from 'lodash';
import { DataGroup } from '../models/data-group.model';

export function addDefaultDataGroupInList(
  dataGroups: DataGroup[],
  newGroupId: string
): DataGroup[] {
  return [
    ...map(dataGroups, (dataGroup: DataGroup) => {
      return { ...dataGroup, current: false };
    }),
    {
      id: newGroupId,
      name: 'Untitled',
      color: '#000000',
      members: []
    }
  ];
}

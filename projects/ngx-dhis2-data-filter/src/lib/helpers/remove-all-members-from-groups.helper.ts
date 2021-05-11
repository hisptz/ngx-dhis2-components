import { DataGroup } from '../models/data-group.model';
import { map } from 'lodash';

export function removeAllMembersFromGroups(dataGroups: DataGroup[]) {
  return map(dataGroups || [], (dataGroup: DataGroup) => {
    return {
      ...dataGroup,
      members: []
    };
  });
}

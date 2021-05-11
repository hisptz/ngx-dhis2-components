import { DataGroup } from '../models/data-group.model';
import { flatten, map, differenceBy, slice, find } from 'lodash';

export function addMembersToGroups(
  dataGroups: DataGroup[],
  selectedGroupId: string,
  members: any[],
  dataGroupPreferences: any
): DataGroup[] {
  const maximumItemPerGroup = dataGroupPreferences
    ? dataGroupPreferences.maximumItemPerGroup
    : (members || []).length;
  let availableMembers = differenceBy(
    members,
    flatten(
      map(dataGroups, (dataGroup: DataGroup) =>
        dataGroup ? dataGroup.members || [] : []
      )
    ),
    'id'
  );

  // Assign to the selected group first until maximum number is reached
  let selectedGroup = find(dataGroups || [], ['id', selectedGroupId]);
  const selectedGroupIndex = (dataGroups || []).indexOf(selectedGroup);

  if (selectedGroup) {
    const membersForSelectedGroup = slice(
      availableMembers,
      0,
      maximumItemPerGroup - selectedGroup.members.length
    );

    selectedGroup = {
      ...selectedGroup,
      members: [...selectedGroup.members, ...membersForSelectedGroup]
    };

    availableMembers = differenceBy(availableMembers, membersForSelectedGroup);
  }

  return map(
    selectedGroupIndex > -1
      ? [
          ...slice(dataGroups, 0, selectedGroupIndex),
          selectedGroup,
          ...slice(dataGroups, selectedGroupIndex + 1)
        ]
      : dataGroups,
    (dataGroup: any) => {
      if (!dataGroup) {
        return null;
      }
      const membersForCurrentGroup = slice(
        availableMembers,
        0,
        maximumItemPerGroup - (dataGroup.members || []).length
      );

      availableMembers = differenceBy(availableMembers, membersForCurrentGroup);

      return {
        ...dataGroup,
        members: [...dataGroup.members, ...membersForCurrentGroup]
      };
    }
  );
}

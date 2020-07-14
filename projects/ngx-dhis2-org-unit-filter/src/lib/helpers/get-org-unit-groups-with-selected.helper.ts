import { OrgUnitGroup } from '../models/org-unit-group.model';

export function getOrgUnitGroupsWithSelected(
  orgUnitGroups: OrgUnitGroup[],
  selectedOrgUnits: any[]
) {
  return (orgUnitGroups || []).map((orgUnitGroup: OrgUnitGroup) => {
    return {
      ...orgUnitGroup,
      selected: (selectedOrgUnits || []).some(
        (selectedOrgUnit: any) =>
          selectedOrgUnit.id === 'OU_GROUP-' + orgUnitGroup.id
      ),
    };
  });
}

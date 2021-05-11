import { OrgUnitGroup } from '../models/org-unit-group.model';
import { OrgUnit } from '../models/org-unit.model';

export function getOrgUnitGroupsWithSelected(
  orgUnitGroups: OrgUnitGroup[],
  selectedOrgUnits: any[]
) {
  return (orgUnitGroups || []).map((orgUnitGroup: OrgUnitGroup) => {
    return {
      ...orgUnitGroup,
      selected: isOrgUnitGroupSelected(selectedOrgUnits, orgUnitGroup),
    };
  });
}

function isOrgUnitGroupSelected(
  selectedOrgUnits: OrgUnit[],
  orgUnitGroup: OrgUnitGroup
) {
  return (selectedOrgUnits || []).some(
    (selectedOrgUnit: any) =>
      selectedOrgUnit.id === 'OU_GROUP-' + orgUnitGroup.id
  );
}

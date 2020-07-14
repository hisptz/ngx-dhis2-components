import { OrgUnit } from '../models/org-unit.model';

export function getSelectedOrgUnitChildrenCount(
  orgUnitId: string,
  selectedOrgUnits: OrgUnit[]
): number {
  return (selectedOrgUnits || []).filter((selectedOrgUnit: OrgUnit) => {
    return (
      (selectedOrgUnit ? selectedOrgUnit.path || '' : '').indexOf(orgUnitId) !==
      -1
    );
  }).length;
}

import { minBy } from 'lodash';
import { OrgUnitLevel } from '../models/org-unit-level.model';
import { OrgUnit } from '../models/org-unit.model';

export function getOrgUnitLevelBySelectedOrgUnits(
  orgUnitLevels: OrgUnitLevel[],
  normalSelectedOrgUnits: OrgUnit[],
  otherSelectedOrgUnits: OrgUnit[]
): OrgUnitLevel[] {
  return (orgUnitLevels || [])
    .filter(
      (orgUnitLevel: OrgUnitLevel) =>
        orgUnitLevel.level >= getTopSelectedOrgUnitLevel(normalSelectedOrgUnits)
    )
    .map((orgUnitLevel: OrgUnitLevel) => {
      return {
        ...orgUnitLevel,
        selected: isOrgUnitLevelSelected(otherSelectedOrgUnits, orgUnitLevel),
      };
    });
}

function isOrgUnitLevelSelected(
  selectedOrgUnits: OrgUnit[],
  orgUnitLevel: OrgUnitLevel
) {
  return (selectedOrgUnits || []).some(
    (selectedOrgUnit: any) =>
      selectedOrgUnit.id === 'LEVEL-' + orgUnitLevel.level
  );
}

function getTopSelectedOrgUnitLevel(selectedOrgUnits: OrgUnit[]): number {
  if (selectedOrgUnits.length === 0) {
    return 1;
  }
  const lowestLevelOrgUnit: OrgUnit = minBy(selectedOrgUnits, 'level');
  return lowestLevelOrgUnit ? lowestLevelOrgUnit.level : 1;
}

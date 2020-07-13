import { filter } from 'lodash';
import { OrgUnitTypes } from '../constants/org-unit-types.constants';
export function getSelectedOrgUnits(selectedOrgUnitItems: any[]): any[] {
  return filter(
    selectedOrgUnitItems || [],
    (selectedOrgUnit) =>
      (!selectedOrgUnit.type &&
        selectedOrgUnit.id &&
        selectedOrgUnit.id.indexOf('LEVEL') === -1 &&
        selectedOrgUnit.id.indexOf('OU_GROUP') === -1) ||
      selectedOrgUnit.type === OrgUnitTypes.ORGANISATION_UNIT
  );
}

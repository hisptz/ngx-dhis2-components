import { getSelectedOrgUnits } from './get-selected-org-units.helper';
import { OrgUnitTypes } from '../constants/org-unit-types.constants';

describe('Given I set selected organisation units without type', () => {
  const expectedSelectedOrgUnits = [{ id: 'org_unit_id', name: 'OrgUnitName' }];
  const selectedOrgUnits = getSelectedOrgUnits(expectedSelectedOrgUnits);
  it('it should return selected  org units with type attached', () => {
    expect(selectedOrgUnits).toEqual(
      expectedSelectedOrgUnits.map((orgUnit) => ({
        ...orgUnit,
        type: OrgUnitTypes.ORGANISATION_UNIT,
      }))
    );
  });
});

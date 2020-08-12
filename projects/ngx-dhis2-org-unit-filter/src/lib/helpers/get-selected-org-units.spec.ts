import { getSelectedOrgUnits } from './get-selected-org-units.helper';

describe('Given I set selected organisation units without type', () => {
  const expectedSelectedOrgUnits = [{ id: 'org_unit_id', name: 'OrgUnitName' }];
  const selectedOrgUnits = getSelectedOrgUnits(expectedSelectedOrgUnits);
  it('it should return selected  org units', () => {
    expect(selectedOrgUnits).toEqual(expectedSelectedOrgUnits);
  });
});

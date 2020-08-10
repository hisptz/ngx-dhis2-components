import { updateOrgUnitSelections } from './update-org-unit-selections.helper';
import { OrgUnit } from '../models/org-unit.model';
import { OrgUnitTypes } from '../constants/org-unit-types.constants';

describe('Given I set single selection mode', () => {
  const orgUnit: OrgUnit = {
    id: 'first',
    name: 'First OrgUnit',
    type: OrgUnitTypes.ORGANISATION_UNIT,
  };
  const selectedOrgUnits: OrgUnit[] = [
    {
      id: 'second',
      name: 'Second OrgUnit',
      type: OrgUnitTypes.ORGANISATION_UNIT,
    },
  ];

  const updatedSelectedOrgUnits = updateOrgUnitSelections(
    orgUnit,
    selectedOrgUnits,
    { singleSelection: true }
  );
  it('should return only one organisation unit per every selection', () => {
    expect(updatedSelectedOrgUnits.length).toEqual(1);
    expect(updatedSelectedOrgUnits[0]).toEqual(orgUnit);
  });
});

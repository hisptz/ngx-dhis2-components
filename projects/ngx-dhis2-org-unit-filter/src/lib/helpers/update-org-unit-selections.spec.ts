import { OrgUnit } from '../models/org-unit.model';
import { updateOrgUnitSelections } from './update-org-unit-selections.helper';

describe('Given I set single selection mode and add org unit in an existing list', () => {
  const orgUnit: OrgUnit = {
    id: 'first',
    name: 'First OrgUnit',
  };
  const selectedOrgUnits: OrgUnit[] = [
    {
      id: 'second',
      name: 'Second OrgUnit',
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

describe('Given I set multiple selection mode', () => {
  const orgUnit: OrgUnit = {
    id: 'first',
    name: 'First OrgUnit',
  };
  const selectedOrgUnits: OrgUnit[] = [
    {
      id: 'second',
      name: 'Second OrgUnit Level',
    },
  ];

  const updatedSelectedOrgUnits = updateOrgUnitSelections(
    orgUnit,
    selectedOrgUnits,
    { singleSelection: false }
  );
  it('should return organisations both existing and selected', () => {
    expect(updatedSelectedOrgUnits.length).toEqual(2);
  });
});

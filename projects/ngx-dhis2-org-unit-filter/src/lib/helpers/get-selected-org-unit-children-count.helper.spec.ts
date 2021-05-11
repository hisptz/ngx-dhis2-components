import { OrgUnit } from '../models/org-unit.model';
import { getSelectedOrgUnitChildrenCount } from './get-selected-org-unit-children-count.helper';

const selectedOrgUnits: OrgUnit[] = [
  {
    id: 'two',
    name: 'Two',
    path: 'one/two',
  },
  {
    id: 'three',
    name: 'Three',
    path: 'one/two/three',
  },
  {
    id: 'four',
    name: 'Four',
    path: 'one/four',
  },
];

describe('Given current org unit and selected orgunits', () => {
  const orgUnit: OrgUnit = { id: 'one', name: 'One' };

  const childrenCount = getSelectedOrgUnitChildrenCount(
    orgUnit.id,
    selectedOrgUnits
  );
  it('should return correct count of selected children orgunits belonging to the current orgunit', () => {
    expect(childrenCount).toEqual(3);
  });
});

describe('Given non-top orgunit and selected orgunits', () => {
  const nonTopOrgUnit: OrgUnit = {
    id: 'two',
    name: 'Two',
    path: 'one/two',
  };

  const selectedOrgUnitsWithoutCurrent: OrgUnit[] = [
    {
      id: 'three',
      name: 'Three',
      path: 'one/two/three',
    },
    {
      id: 'four',
      name: 'Four',
      path: 'one/four',
    },
  ];

  const childrenCount = getSelectedOrgUnitChildrenCount(
    nonTopOrgUnit.id,
    selectedOrgUnitsWithoutCurrent
  );
  it('should return count of selected children below its hierarchy', () => {
    expect(childrenCount).toEqual(1);
  });

  it('should return count of selected children and itself', () => {});
});

describe('Given non-top orgunit and selected orgunits where current orgunit is part of selection', () => {
  const nonTopOrgUnit: OrgUnit = {
    id: 'two',
    name: 'Two',
    path: 'one/two',
  };

  const childrenCount = getSelectedOrgUnitChildrenCount(
    nonTopOrgUnit.id,
    selectedOrgUnits
  );

  it('should return count of selected children and itself', () => {
    expect(childrenCount).toEqual(2);
  });
});

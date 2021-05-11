import { OrgUnit } from '../models/org-unit.model';
import { sortOrgUnitsByName } from './sort-org-units.helper';

describe('Given organisation unit array with children to sort by name', () => {
  const orgUnits: OrgUnit[] = [
    {
      id: 'second',
      name: 'Elephant',
      children: [
        {
          id: 'third_child',
          name: 'Mother Elephant',
        },
        {
          id: 'first_child',
          name: 'Baby Elephant',
        },
        {
          id: 'second_child',
          name: 'Father  Elephant',
        },
      ],
    },
    {
      id: 'first',
      name: 'Apple',
      children: [
        {
          id: 'first_child',
          name: 'Cat Apple',
        },
        {
          id: 'second_child',
          name: 'Animal Apple',
        },
      ],
    },
  ];

  const expectedOrgUnits = [
    {
      id: 'first',
      name: 'Apple',
      children: [
        {
          id: 'second_child',
          name: 'Animal Apple',
        },
        {
          id: 'first_child',
          name: 'Cat Apple',
        },
      ],
    },
    {
      id: 'second',
      name: 'Elephant',
      children: [
        {
          id: 'first_child',
          name: 'Baby Elephant',
        },
        {
          id: 'second_child',
          name: 'Father  Elephant',
        },
        {
          id: 'third_child',
          name: 'Mother Elephant',
        },
      ],
    },
  ];
  const sortedOrgUnits = sortOrgUnitsByName(orgUnits);
  it('should return organisation units and children sorted by name', () => {
    expect(sortedOrgUnits).toEqual(expectedOrgUnits);
  });
});

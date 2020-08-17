import { getOrgUnitGroupsWithSelected } from './get-org-unit-groups-with-selected.helper';

describe('Given no orgunit group is selected', () => {
  const orgUnitGroups = [
    { id: 'group1', name: 'Group One' },
    { id: 'group2', name: 'Group Two' },
    { id: 'group3', name: 'Group Three' },
  ];

  const selectedOrgUnitItems = [
    {
      id: 'normal_org_unit',
      name: 'Normal Orgunit name',
    },
  ];

  const filteredOrgUnitGroups = getOrgUnitGroupsWithSelected(
    orgUnitGroups,
    selectedOrgUnitItems
  ).filter((orgUnitGroup) => !orgUnitGroup.selected);

  it('should return all list of org unit group without selected attribute being set', () => {
    expect(filteredOrgUnitGroups.length).toEqual(orgUnitGroups.length);
  });
});

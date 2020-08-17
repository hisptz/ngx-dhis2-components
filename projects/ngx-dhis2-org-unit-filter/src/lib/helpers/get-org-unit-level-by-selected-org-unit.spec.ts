import { getOrgUnitLevelBySelectedOrgUnits } from './get-org-unit-level-by-selected-org-unit.helper';

describe('Given no orgunit level is selected', () => {
  const orgUnitLevels = [
    { id: 'level1', name: 'Level 1', level: 1 },
    { id: 'level2', name: 'Level 2', level: 2 },
    {
      id: 'level3',
      name: 'Level 3',
      level: 3,
    },
    { id: 'level4', name: 'Level 4', level: 4 },
  ];
  const selectedNormalOrgUnits = [
    {
      id: 'normal_org_unit',
      name: 'Normal Orgunit name',
      level: 1,
    },
  ];
  const selectedOrgUnitItems = [
    {
      id: 'normal_org_unit',
      name: 'Normal Orgunit name',
    },
  ];

  const filteredOrgUnitLevels = getOrgUnitLevelBySelectedOrgUnits(
    orgUnitLevels,
    selectedNormalOrgUnits,
    selectedOrgUnitItems
  ).filter((orgUnitLevel) => !orgUnitLevel.selected);

  it('should return all list of org unit level without selected attribute being set', () => {
    expect(filteredOrgUnitLevels.length).toEqual(orgUnitLevels.length);
  });
});

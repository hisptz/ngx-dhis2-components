import { OrgUnitTypes } from '../constants/org-unit-types.constants';
import * as _ from 'lodash';
import { OrgUnitFilterConfig } from '../models/org-unit-filter-config.model';
export function updateOrgUnitSelections(
  selectedOrgUnit: any,
  selectedOrgUnitItems: any[],
  orgUnitFilterConfig: OrgUnitFilterConfig
): any[] {
  switch (selectedOrgUnit.type) {
    case OrgUnitTypes.ORGANISATION_UNIT_LEVEL:
      return updateOrgUnitItemsWithSelected(
        selectedOrgUnitItems,
        selectedOrgUnit,
        OrgUnitTypes.ORGANISATION_UNIT_GROUP
      );

    case OrgUnitTypes.ORGANISATION_UNIT_GROUP:
      return updateOrgUnitItemsWithSelected(
        selectedOrgUnitItems,
        selectedOrgUnit,
        OrgUnitTypes.ORGANISATION_UNIT_LEVEL
      );

    default:
      return !orgUnitFilterConfig.singleSelection
        ? updateMultipleNormalOrgUnitsWithSelected(
            selectedOrgUnitItems,
            selectedOrgUnit
          )
        : updateSingleNormalOrgUnitsWithSelected(
            selectedOrgUnitItems,
            selectedOrgUnit
          );
  }
}

function updateOrgUnitItemsWithSelected(
  selectedOrgUnitItems,
  selectedOrgUnit,
  typeToExclude
) {
  return [
    ..._.filter(
      selectedOrgUnitItems || [],
      (selectedOrgUnitItem) => selectedOrgUnitItem.type !== typeToExclude
    ),
    selectedOrgUnit,
  ];
}

function updateMultipleNormalOrgUnitsWithSelected(
  selectedOrgUnitItems,
  selectedOrgUnit
) {
  return [
    ...(selectedOrgUnit.type === OrgUnitTypes.USER_ORGANISATION_UNIT
      ? _.filter(
          selectedOrgUnitItems || [],
          (selectedOrgUnitItem) =>
            selectedOrgUnitItem.type === OrgUnitTypes.USER_ORGANISATION_UNIT
        )
      : selectedOrgUnitItems),
    selectedOrgUnit,
  ];
}

function updateSingleNormalOrgUnitsWithSelected(
  selectedOrgUnitItems,
  selectedOrgUnit
) {
  return [
    ...(selectedOrgUnit.type === OrgUnitTypes.USER_ORGANISATION_UNIT
      ? []
      : _.filter(
          selectedOrgUnitItems || [],
          (orgUnit) => orgUnit.type !== selectedOrgUnit.type
        )),
    selectedOrgUnit,
  ];
}

import { OrgUnitTypes } from '../constants/org-unit-types.constants';
import * as _ from 'lodash';
import { OrgUnitFilterConfig } from '../models/org-unit-filter-config.model';
export function updateOrgUnitSelections(
  selectedOrgUnit: any,
  selectedOrgUnitItems: any[],
  orgUnitFilterConfig: OrgUnitFilterConfig
): any[] {
  if (selectedOrgUnit.type === OrgUnitTypes.ORGANISATION_UNIT_LEVEL) {
    selectedOrgUnitItems = [
      ..._.filter(
        selectedOrgUnitItems || [],
        (selectedOrgUnitItem) =>
          selectedOrgUnitItem.type !== OrgUnitTypes.ORGANISATION_UNIT_GROUP
      ),
      selectedOrgUnit,
    ];
  } else if (selectedOrgUnit.type === OrgUnitTypes.ORGANISATION_UNIT_GROUP) {
    selectedOrgUnitItems = [
      ..._.filter(
        selectedOrgUnitItems || [],
        (selectedOrgUnitItem) =>
          selectedOrgUnitItem.type !== OrgUnitTypes.ORGANISATION_UNIT_LEVEL
      ),
      selectedOrgUnit,
    ];
  } else {
    selectedOrgUnitItems = !orgUnitFilterConfig.singleSelection
      ? [
          ...(selectedOrgUnit.type === OrgUnitTypes.USER_ORGANISATION_UNIT
            ? _.filter(
                selectedOrgUnitItems || [],
                (selectedOrgUnitItem) =>
                  selectedOrgUnitItem.type ===
                  OrgUnitTypes.USER_ORGANISATION_UNIT
              )
            : selectedOrgUnitItems),
          selectedOrgUnit,
        ]
      : [
          ...(selectedOrgUnit.type === OrgUnitTypes.USER_ORGANISATION_UNIT
            ? []
            : _.filter(
                selectedOrgUnitItems || [],
                (orgUnit) => orgUnit.type !== selectedOrgUnit.type
              )),
          selectedOrgUnit,
        ];
  }

  return selectedOrgUnitItems;
}

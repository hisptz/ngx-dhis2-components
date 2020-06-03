import { SelectionFilterConfig } from '../models/selected-filter-config.model';

export const SELECTION_FILTER_CONFIG: SelectionFilterConfig = {
  showDataFilter: true,
  showPeriodFilter: true,
  showValidationRuleGroupFilter: true,
  showOrgUnitFilter: true,
  showLayout: false,
  showDynamicDimension: true,
  orgUnitFilterConfig: {
    singleSelection: true,
    closeOnDestroy: true
  }
};

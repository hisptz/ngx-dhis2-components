import { OrgUnitFilterConfig } from '@iapps/ngx-dhis2-org-unit-filter';
import { PeriodFilterConfig } from '@iapps/ngx-dhis2-period-filter';
import { DataFilterConfig } from '@iapps/ngx-dhis2-data-filter';

export interface SelectionFilterConfig {
  showDataFilter?: boolean;
  disableDataFilter?: boolean;
  showPeriodFilter?: boolean;
  disablePeriodFilter?: boolean;
  showOrgUnitFilter?: boolean;
  disableOrgUnitFilter?: boolean;
  showValidationRuleGroupFilter?: boolean;
  disableValidationRuleGroupFilter?: boolean;
  showLayout?: boolean;
  disableLayout?: boolean;
  showDynamicDimension?: boolean;
  disableDynamicDimension?: boolean;
  orgUnitFilterConfig?: OrgUnitFilterConfig;
  dataFilterConfig?: DataFilterConfig;
  periodFilterConfig?: PeriodFilterConfig;
  selectedPeriodType?: string;
  disablePeriodTypeSelection?: boolean;
  allowStepSelection?: boolean;
  stepSelections?: string[];
}

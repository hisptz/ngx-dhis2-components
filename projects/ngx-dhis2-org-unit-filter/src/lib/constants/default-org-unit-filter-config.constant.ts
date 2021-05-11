import { OrgUnitFilterConfig } from '../models/org-unit-filter-config.model';

export const DEFAULT_ORG_UNIT_FILTER_CONFIG: OrgUnitFilterConfig = {
  reportUse: true,
  singleSelection: true,
  emitOnSelection: false,
  closeOnDestroy: true,
  showUserOrgUnitSection: true,
  showOrgUnitGroupSection: true,
  showOrgUnitLevelSection: true,
  showOrgUnitLevelGroupSection: true,
};

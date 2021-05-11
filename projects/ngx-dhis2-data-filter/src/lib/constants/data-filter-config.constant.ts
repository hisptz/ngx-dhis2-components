import { DataFilterConfig } from '../models/data-filter-config.model';

export const defaultDataFilterConfig: DataFilterConfig = {
  enabledSelections: ['in', 'fn', 'de'],
  singleSelection: false,
  showGroupsOnStartup: false,
  hideSelectedPanel: true
};

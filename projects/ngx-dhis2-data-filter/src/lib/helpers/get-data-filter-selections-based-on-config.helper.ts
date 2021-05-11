import { filter, uniq } from 'lodash';
import { DataFilterSelection } from '../models/data-filter-selection.model';
import { DATA_FILTER_SELECTIONS } from '../constants/data-filter-selections.constant';
import { DataFilterConfig } from '../models/data-filter-config.model';
export function getDataFilterSelectionsBasedOnConfig(
  dataFilterConfig: DataFilterConfig
) {
  // set data filter selections
  const enabledSelections = uniq([
    'all',
    ...(dataFilterConfig ? dataFilterConfig.enabledSelections : [])
  ]);

  return filter(
    DATA_FILTER_SELECTIONS || [],
    (dataFilterSelection: DataFilterSelection) => {
      if (!dataFilterConfig || !dataFilterConfig.enabledSelections) {
        return true;
      }

      return enabledSelections.indexOf(dataFilterSelection.prefix) !== -1;
    }
  );
}

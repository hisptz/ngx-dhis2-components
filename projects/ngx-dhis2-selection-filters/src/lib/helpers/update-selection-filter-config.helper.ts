import { SelectionFilterConfig } from '../models/selected-filter-config.model';
import { SELECTION_FILTER_CONFIG } from '../constants/selection-filter-config.constant';

import { each, find } from 'lodash';

export function updateSelectionFilterConfig(
  selectionFilterConfig: SelectionFilterConfig,
  dataSelections: any[]
): SelectionFilterConfig {
  let newSelectionFilterConfig: SelectionFilterConfig = {
    ...SELECTION_FILTER_CONFIG,
    ...(selectionFilterConfig || {})
  };
  if (newSelectionFilterConfig.allowStepSelection) {
    const stepSelections = selectionFilterConfig.stepSelections || [];
    each(
      stepSelections,
      (stepSelection: string, stepSelectionIndex: number) => {
        if (stepSelectionIndex > 0) {
          const previousSelection = find(dataSelections, [
            'dimension',
            stepSelections[stepSelectionIndex - 1]
          ]);

          const disableAttribute = getDisableFilterType(stepSelection);
          if (disableAttribute) {
            newSelectionFilterConfig = {
              ...newSelectionFilterConfig,
              [disableAttribute]:
                !previousSelection ||
                (previousSelection.items || []).length === 0
            };
          }
        }
      }
    );
  }

  return newSelectionFilterConfig;
}

function getDisableFilterType(dimension: string): string {
  switch (dimension) {
    case 'dx': {
      return 'disableDataFilter';
    }

    case 'pe': {
      return 'disablePeriodFilter';
    }

    case 'vrg': {
      return 'disableValidationRuleGroupFilter';
    }

    case 'ou': {
      return 'disableOrgUnitFilter';
    }

    default:
      return undefined;
  }
}

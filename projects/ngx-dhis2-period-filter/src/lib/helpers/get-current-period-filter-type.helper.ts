import { PeriodFilterTypes } from '../constants/period-filter-types.constant';

export function getCurrentPeriodFilterType(
  periodFilterTypes: any[],
  selectedPeriodType
) {
  /**
   * Pick the filter period filter type If there are multiple period filter types
   *
   *
   */

  // console.log('peropd Filter Types :: ', periodFilterTypes, selectedPeriodType);
  if (periodFilterTypes && periodFilterTypes.length > 0) {
    return selectedPeriodType && selectedPeriodType == 'Range'
      ? PeriodFilterTypes.DATE_RANGE
      : selectedPeriodType && selectedPeriodType == 'Relative'
      ? PeriodFilterTypes.RELATIVE
      : selectedPeriodType && selectedPeriodType == 'Fixed'
      ? PeriodFilterTypes.FIXED
      : periodFilterTypes[0].id;
  }

  if (selectedPeriodType) {
    /**
     * Check if period filter type is period range
     */

    if (selectedPeriodType == 'Range') {
      return PeriodFilterTypes.DATE_RANGE;
    }

    /**
     * Check if period filter type is relative
     */
    if (selectedPeriodType == 'Relative') {
      return PeriodFilterTypes.RELATIVE;
    }

    /**
     * Check if period filter type is fixed
     */
    if (selectedPeriodType == 'Fixed') {
      return PeriodFilterTypes.FIXED;
    }
  }

  return PeriodFilterTypes.RELATIVE;
}

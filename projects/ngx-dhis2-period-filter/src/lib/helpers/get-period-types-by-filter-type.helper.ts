import * as _ from 'lodash';
import { PeriodFilterTypes } from '../constants/period-filter-types.constant';

export function getPeriodTypesByFilterType(periodTypes, filterType) {
  if (!filterType) {
    return periodTypes;
  }
  return (periodTypes || []).filter((periodType: any) => {
    switch (filterType) {
      case PeriodFilterTypes.FIXED:
        return (periodType ? periodType.name : '').indexOf('Relative') === -1;
      case PeriodFilterTypes.RELATIVE:
        return (periodType ? periodType.name : '').indexOf('Relative') !== -1;
      default:
        return true;
    }
  });
}

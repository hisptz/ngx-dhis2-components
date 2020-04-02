import * as _ from 'lodash';

export function filterPeriodTypesByFilterType(periodTypes, filterType) {
  let relativePeriodTypes = [];
  let fixedPeriodTypes = [];
  periodTypes.map(periodType => {
    if (periodType.name.indexOf('Relative') > -1) {
      relativePeriodTypes.push(periodType);
    } else {
      fixedPeriodTypes.push(periodType);
    }
  });
  if (filterType == 'fixed-periods') {
    return fixedPeriodTypes;
  } else if (filterType == 'relative-periods') {
    return relativePeriodTypes;
  } else {
    return [];
  }
}

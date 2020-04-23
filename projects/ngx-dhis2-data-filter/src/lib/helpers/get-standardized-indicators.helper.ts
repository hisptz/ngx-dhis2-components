import { map, uniqBy } from 'lodash';
import { Indicator } from '../models/indicator.model';
import { getIndicatorFormulaParameters } from './get-indicator-formula-parameters.helper';

export function getStandardizedIndicators(Indicators: any[]): Indicator[] {
  return map(Indicators || [], (indicator: any) => {
    return {
      id: indicator.id,
      name: indicator.name,
      dataElements: uniqBy(
        [
          ...getIndicatorFormulaParameters(indicator.numerator),
          ...getIndicatorFormulaParameters(indicator.denominator)
        ],
        'id'
      ),
      type: 'INDICATOR'
    };
  });
}

import { map, filter } from 'lodash';

export function getStandardizedFunction(
  functionItem: any,
  isSelected?: boolean
) {
  return {
    ...functionItem,
    selected: isSelected,
    rules: filter(
      map(functionItem.rules || [], (rule: any) =>
        rule ? rule.id : undefined
      ),
      rule => rule
    )
  };
}

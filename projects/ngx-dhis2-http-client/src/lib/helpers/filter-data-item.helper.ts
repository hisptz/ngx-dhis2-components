export function filterDataItem(dataItem: any, filterList: any[]) {
  return (filterList || []).some((filterItem: any) => {
    const { attribute, condition, filterValue } = filterItem;
    switch (condition) {
      case 'ilike':
        return (dataItem[attribute] || '').indexOf(filterValue) !== -1;

      case 'eq':
        return dataItem[attribute] === filterValue;

      case 'le':
        return parseInt(dataItem[attribute], 10) <= parseInt(filterValue, 10);

      case 'lt':
        return parseInt(dataItem[attribute], 10) < parseInt(filterValue, 10);

      case 'ge':
        return parseInt(dataItem[attribute], 10) >= parseInt(filterValue, 10);

      case 'gt':
        return parseInt(dataItem[attribute], 10) > parseInt(filterValue, 10);

      case 'in':
        return (filterValue || '').indexOf(dataItem[attribute]) !== -1;

      default:
        return false;
    }
  });
}

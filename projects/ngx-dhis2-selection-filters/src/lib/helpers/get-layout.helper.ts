export function getLayout(dimensionType) {
  switch (dimensionType) {
    case 'ou':
      return 'filters';
    case 'pe':
      return 'rows';
    case 'dx':
      return 'columns';
    default:
      return 'filters';
  }
}

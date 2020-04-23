import { DataFilterSelection } from '../models/data-filter-selection.model';

export const DATA_FILTER_SELECTIONS: DataFilterSelection[] = [
  {
    name: 'All',
    prefix: 'all',
    selected: true
  },
  {
    name: 'Data elements',
    prefix: 'de',
    selected: false,
    key: 'dataElementGroup',
    itemsReference: { key: 'dataElements', reference: 'dataElement' }
  },
  {
    name: 'Indicators',
    prefix: 'in',
    selected: false,
    key: 'indicatorGroup',
    itemsReference: { key: 'indicators', reference: 'indicator' }
  },
  {
    name: 'Data sets',
    prefix: 'ds',
    selected: false,
    key: 'dataSet'
  },
  {
    name: 'Program indicators',
    prefix: 'pi',
    selected: false,
    key: 'programIndicator'
  },
  {
    name: 'Functions',
    prefix: 'fn',
    selected: false,
    key: 'function',
    itemsReference: { key: 'rules', reference: 'functionRule' }
  }
];

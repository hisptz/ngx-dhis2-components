import { getCurrentPeriodFilterType } from './get-current-period-filter-type.helper';

const periodTypes = [
  { id: 'FIXED', name: 'Fixed Periods' },
  { id: 'RELATIVE', name: 'Relative Periods' },
  { id: 'DATE_RANGE', name: 'Date Range' }
];
describe('Given Range Types', () => {
  const returnedPeSelectionType = getCurrentPeriodFilterType(
    periodTypes,
    'Range'
  );

  it('should return rangetype', () => {
    expect(returnedPeSelectionType).toEqual('DATE_RANGE');
  });
});

describe('Given Fixed Types', () => {
  const returnedPeSelectionType = getCurrentPeriodFilterType(
    periodTypes,
    'Fixed'
  );

  it('should return fixed type', () => {
    expect(returnedPeSelectionType).toEqual('FIXED');
  });
});

describe('Given Relative Types', () => {
  const returnedPeSelectionType = getCurrentPeriodFilterType(
    periodTypes,
    'Relative'
  );

  it('should return relative type', () => {
    expect(returnedPeSelectionType).toEqual('RELATIVE');
  });
});

describe('Given Undefined Types', () => {
  const returnedPeSelectionType = getCurrentPeriodFilterType(
    periodTypes,
    undefined
  );

  it('should return some type', () => {
    expect(returnedPeSelectionType).not.toEqual('' || undefined || null);
  });
});

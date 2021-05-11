import { find } from 'lodash';
export function updateDataSelections(
  dataSelections: any[],
  selectedObject: any
): any[] {
  const selectedDimension = find(dataSelections, [
    'dimension',
    selectedObject.dimension,
  ]);
  const selectedDimensionIndex = selectedDimension
    ? dataSelections.indexOf(selectedDimension)
    : -1;
  return selectedDimension
    ? [
        ...dataSelections.slice(0, selectedDimensionIndex),
        { ...selectedDimension, ...selectedObject },
        ...dataSelections.slice(selectedDimensionIndex + 1),
      ]
    : dataSelections
    ? [...dataSelections, selectedObject]
    : [selectedObject];
}

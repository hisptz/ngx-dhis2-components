export function getStandardizedDataElements(dataElements: any[]) {
  return (dataElements || []).map((dataElement: any) => {
    return {
      ...dataElement,
      type: 'DATA_ELEMENT'
    };
  });
}

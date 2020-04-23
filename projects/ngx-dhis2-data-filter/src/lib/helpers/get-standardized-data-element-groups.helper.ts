export function getStandardizedDataElementGroups(dataElementGroups: any[]) {
  return (dataElementGroups || []).map((dataElementGroup: any) => {
    return {
      ...dataElementGroup,
      dataElements: (dataElementGroup.dataElements || []).map(
        (dataElement: any) => dataElement.id
      )
    };
  });
}

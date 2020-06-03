import { uniq, flatten } from 'lodash';
export function getDataElementsFromIndicators(dataItems) {
  return uniq(
    flatten(
      (dataItems || [])

        .map((item: any) =>
          (item.dataElements || [])
            .filter(
              (indicatorElement: any) =>
                indicatorElement.metadataType === 'dataElement'
            )
            .map((dataElement: any) => dataElement.id.split('.')[0])
        )
        .filter(dataElement => dataElement)
    )
  );
}

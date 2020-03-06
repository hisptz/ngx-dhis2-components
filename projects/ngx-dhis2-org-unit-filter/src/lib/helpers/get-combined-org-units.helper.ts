import { flatten, omit } from 'lodash';
export function getCombinedOrgUnits(orgUnitResponseArray: any[]) {
  let otherParameters = null;
  const organisationUnits = flatten(
    orgUnitResponseArray.map((orgUnitResult: any, index: number) => {
      if (index === 0) {
        otherParameters = omit(orgUnitResult, 'organisationUnits');
      }
      return orgUnitResult.organisationUnits;
    })
  );
  return {
    ...otherParameters,
    organisationUnits
  };
}

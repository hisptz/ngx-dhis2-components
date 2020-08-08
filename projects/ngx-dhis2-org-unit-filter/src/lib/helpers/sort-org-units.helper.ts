import { OrgUnit } from '../models/org-unit.model';

import { sortBy } from 'lodash';
export function sortOrgUnitsByName(orgUnits: OrgUnit[]): OrgUnit[] {
  return sortBy(orgUnits || [], 'name').map((orgUnit) => {
    const sortedChildren = orgUnit.children
      ? sortOrgUnitsByName(orgUnit.children)
      : undefined;
    if (!sortedChildren) {
      return orgUnit;
    }
    return { ...orgUnit, children: sortedChildren };
  });
}

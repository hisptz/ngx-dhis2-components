import * as _ from 'lodash';
import { User } from '@iapps/ngx-dhis2-http-client';
export function getUserOrgUnitIds(userInfo: User, isForReport: boolean) {
  return _.uniq(
    _.map(
      isForReport
        ? userInfo.dataViewOrganisationUnits || []
        : userInfo.organisationUnits || [],
      (orgUnit) => orgUnit.id
    )
  );
}

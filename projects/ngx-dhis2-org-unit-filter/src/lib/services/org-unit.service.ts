import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService, User } from '@iapps/ngx-dhis2-http-client';
import { from, Observable, of, zip } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { getOrgUnitUrls } from '../helpers/get-org-unit-urls.helper';
import { OrgUnitFilterConfig } from '../models/org-unit-filter-config.model';
import { OrgUnit } from '../models/org-unit.model';
import { DEFAULT_ORG_UNIT_FIELDS } from '../constants/default-org-unit-fields.constants';
import * as _ from 'lodash';
import { getCombinedOrgUnits } from '../helpers/get-combined-org-units.helper';
import { getUserOrgUnits } from '../helpers/get-user-org-units.helper';
import { OrgUnitLevelService } from './org-unit-level.service';
import { OrgUnitLevel } from '../models/org-unit-level.model';

@Injectable()
export class OrgUnitService {
  constructor(
    private httpClient: NgxDhis2HttpClientService,
    private orgUnitLevelService: OrgUnitLevelService
  ) {}

  loadAll(
    orgUnitFilterConfig: OrgUnitFilterConfig,
    userOrgUnits: string[]
  ): Observable<OrgUnit[]> {
    const pageSize = orgUnitFilterConfig.batchSize || 500;
    const orgUnitFields = _.join(
      _.uniq([
        ...DEFAULT_ORG_UNIT_FIELDS,
        ...(orgUnitFilterConfig.additionalQueryFields || []),
      ]),
      ','
    );
    return this.httpClient
      .get('organisationUnits.json', {
        useIndexDb: true,
        fetchOnlineIfNotExist: false,
      })
      .pipe(
        catchError(() => of({ organisationUnits: [] })),
        switchMap((indexDBResponse: any) => {
          const indexDBOrgUnits = indexDBResponse
            ? indexDBResponse.organisationUnits || []
            : [];

          return indexDBOrgUnits.length > 0
            ? of(indexDBOrgUnits)
            : this._getInitialOrgUnits(
                userOrgUnits,
                pageSize,
                orgUnitFilterConfig.minLevel,
                orgUnitFields
              ).pipe(
                mergeMap((orgUnitResponse: any) => {
                  const orgUnitLength =
                    orgUnitResponse && orgUnitResponse.pager
                      ? orgUnitResponse.pager.total
                      : 0;

                  if (orgUnitLength === 0) {
                    return of([]);
                  }

                  const pageCount = Math.ceil(orgUnitLength / pageSize);
                  return from(
                    getOrgUnitUrls(
                      userOrgUnits,
                      pageCount,
                      pageSize,
                      orgUnitFilterConfig.minLevel,
                      orgUnitFields
                    )
                  ).pipe(
                    mergeMap((orgUnitUrl: string, index: number) => {
                      return index === 0
                        ? of(orgUnitResponse.organisationUnits || [])
                        : this._loadOrgUnitsByUrl(orgUnitUrl);
                    })
                  );
                })
              );
        })
      );
  }

  loadById(
    id: string,
    level: number,
    orgUnitFilterConfig: OrgUnitFilterConfig
  ): Observable<OrgUnit> {
    const orgUnitFields = _.join(
      _.uniq([
        ...DEFAULT_ORG_UNIT_FIELDS,
        ...(orgUnitFilterConfig.additionalQueryFields || []),
      ]),
      ','
    );
    return zip(
      this.httpClient.get(
        `organisationUnits/${id}.json?fields=${orgUnitFields}`,
        { useIndexDb: true }
      ),
      this.loadChildren(id, level, orgUnitFilterConfig)
    ).pipe(
      map((results: any[]) => {
        return {
          ...results[0],
          children: results[1] || [],
        };
      })
    );
  }

  loadChildren(
    id: string,
    level: number,
    orgUnitFilterConfig: OrgUnitFilterConfig
  ): Observable<OrgUnit[]> {
    const orgUnitFields = _.join(
      _.uniq([
        ...DEFAULT_ORG_UNIT_FIELDS,
        ...(orgUnitFilterConfig.additionalQueryFields || []),
      ]),
      ','
    );

    return this.orgUnitLevelService.loadAll().pipe(
      mergeMap((orgUnitLevels: OrgUnitLevel[]) => {
        const lowestOrgUnitLevel: OrgUnitLevel = _.maxBy(
          orgUnitLevels,
          'level'
        );

        return lowestOrgUnitLevel && lowestOrgUnitLevel.level > level
          ? this.httpClient
              .get(
                `organisationUnits.json?fields=${orgUnitFields}&order=name:asc&filter=parent.id:eq:${id}&paging=false`,
                { useIndexDb: true }
              )
              .pipe(map((res) => (res ? res.organisationUnits : [])))
          : of([]);
      })
    );
  }

  loadUserOrgUnits(
    orgUnitFilterConfig: OrgUnitFilterConfig
  ): Observable<OrgUnit[]> {
    return this.httpClient.me().pipe(
      switchMap((user: User) => {
        const userOrgUnits: OrgUnit[] = getUserOrgUnits(
          user,
          orgUnitFilterConfig.reportUse,
          false
        );

        return zip(
          ...userOrgUnits.map((orgUnit: OrgUnit) =>
            this.loadChildren(
              orgUnit.id,
              orgUnit.level,
              orgUnitFilterConfig
            ).pipe(map((children: OrgUnit[]) => ({ ...orgUnit, children })))
          )
        );
      })
    );
  }

  private _getInitialOrgUnits(
    userOrgUnits: string[],
    pageSize: number,
    minLevel: number,
    orgUnitFields
  ) {
    return zip(
      ...userOrgUnits.map((orgUnitId: string) =>
        this.httpClient.get(
          'organisationUnits.json?fields=' +
            orgUnitFields +
            '&order=level:asc' +
            '&order=name:asc&filter=path:ilike:' +
            orgUnitId +
            '&pageSize=' +
            pageSize +
            (minLevel ? '&filter=level:le:' + minLevel : ''),
          { useIndexDb: true }
        )
      )
    ).pipe(map((orgUnitResults: any[]) => getCombinedOrgUnits(orgUnitResults)));
  }

  private _loadOrgUnitsByUrl(orgUnitUrl: string) {
    return this.httpClient
      .get(orgUnitUrl, {
        useIndexDb: true,
      })
      .pipe(
        map((orgUnitResult: any) => {
          return orgUnitResult.organisationUnits;
        })
      );
  }
}

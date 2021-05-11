import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { map } from 'rxjs/operators';
import { getStandardizedDataElementGroups } from '../helpers/get-standardized-data-element-groups.helper';

@Injectable({ providedIn: 'root' })
export class DataElementGroupService {
  constructor(private readonly http: NgxDhis2HttpClientService) {}

  loadAll() {
    return this.http
      .get(
        'dataElementGroups.json?paging=false&fields=id,name,dataElements[id,name,categoryCombo]'
      )
      .pipe(
        map(res =>
          getStandardizedDataElementGroups(res.dataElementGroups || [])
        )
      );
  }
}

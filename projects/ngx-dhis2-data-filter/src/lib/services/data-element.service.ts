import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { map } from 'rxjs/operators';
import { getStandardizedDataElements } from '../helpers/get-standardized-data-elements.helper';

@Injectable({ providedIn: 'root' })
export class DataElementService {
  constructor(private http: NgxDhis2HttpClientService) {}

  loadAll() {
    return this.http
      .get(
        'dataElements.json?fields=,id,name,valueType,categoryCombo&paging=false&filter=' +
          'domainType:eq:AGGREGATE&filter=valueType:ne:TEXT&filter=valueType:ne:LONG_TEXT'
      )
      .pipe(
        map((res: any) => getStandardizedDataElements(res.dataElements || []))
      );
  }
}

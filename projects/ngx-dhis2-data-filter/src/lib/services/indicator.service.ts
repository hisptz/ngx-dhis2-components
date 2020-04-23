import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { map } from 'rxjs/operators';
import { getStandardizedIndicators } from '../helpers/get-standardized-indicators.helper';

@Injectable({ providedIn: 'root' })
export class IndicatorService {
  constructor(private http: NgxDhis2HttpClientService) {}

  loadAll() {
    return this.http
      .get(
        'indicators.json?fields=id,name,code,numerator,denominator&paging=false'
      )
      .pipe(map(res => getStandardizedIndicators(res.indicators || [])));
  }
}

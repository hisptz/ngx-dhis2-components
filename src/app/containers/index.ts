import { HttpClientComponent } from './http-client/http-client.component';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { OrgUnitFilterComponent } from './org-unit-filter/org-unit-filter.component';
import { PeriodFilterComponent } from './period-filter/period-filter.component';
import { DataFilterComponent } from './data-filter/data-filter.component';
import { MenuComponent } from './menu/menu.component';
import { DimensionFilterComponent } from './dimension-filter/dimension-filter.component';
import { Dhis2MapsComponent } from './dhis2-maps/dhis2-maps.component';

export const containers: any[] = [
  HttpClientComponent,
  DictionaryComponent,
  OrgUnitFilterComponent,
  PeriodFilterComponent,
  DataFilterComponent,
  MenuComponent,
  DimensionFilterComponent,
  Dhis2MapsComponent
];

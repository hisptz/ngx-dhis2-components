import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app.routing.module';
import { containers } from './containers';
import { NgxDhis2OrgUnitFilterModule } from 'projects/ngx-dhis2-org-unit-filter/src/public-api';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { NgxDhis2HttpClientModule } from '@iapps/ngx-dhis2-http-client';
import { NgxDhis2DictionaryModule } from 'projects/ngx-dhis2-dictionary/src/public-api';
import { NgxDhis2MenuModule } from 'projects/ngx-dhis2-menu/src/public-api';
import { NgxDhis2PeriodFilterModule } from 'projects/ngx-dhis2-period-filter/src/public-api';
import { MapModule } from 'projects/ngx-maps/src/public-api';

@NgModule({
  declarations: [AppComponent, ...containers],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxDhis2HttpClientModule.forRoot({
      namespace: 'hisptz',
      version: 1,
      models: {
        users: 'id',
        organisationUnitLevels: 'id',
        organisationUnits: 'id,name,level',
        organisationUnitGroups: 'id',
        dataStore_scorecards: 'id'
      }
    }),
    NgxDhis2OrgUnitFilterModule,
    NgxDhis2DictionaryModule,
    NgxDhis2MenuModule,
    NgxDhis2PeriodFilterModule,
    MapModule,
    StoreModule.forRoot({}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    AppRoutingModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

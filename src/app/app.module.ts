import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app.routing.module';
import { containers } from './containers';
import { NgxDhis2HttpClientModule } from 'projects/ngx-dhis2-http-client/src/public_api';

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
    AppRoutingModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

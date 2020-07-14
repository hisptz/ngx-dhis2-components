import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientComponent } from './http-client.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxDhis2HttpClientModule } from '@iapps/ngx-dhis2-http-client';

describe('HttpClientComponent', () => {
  let component: HttpClientComponent;
  let fixture: ComponentFixture<HttpClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        NgxDhis2HttpClientModule.forRoot({
          namespace: 'hisptz',
          version: 1,
          models: {
            users: 'id',
            organisationUnitLevels: 'id,level',
            organisationUnits: 'id,name,level',
            organisationUnitGroups: 'id',
            dataStore_scorecards: 'id',
          },
        }),
      ],
      declarations: [HttpClientComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

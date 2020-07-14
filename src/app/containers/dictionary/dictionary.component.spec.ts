import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { DictionaryComponent } from './dictionary.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxDhis2HttpClientModule } from '@iapps/ngx-dhis2-http-client';

describe('DictionaryComponent', () => {
  let component: DictionaryComponent;
  let fixture: ComponentFixture<DictionaryComponent>;
  let store: MockStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        RouterTestingModule,
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
      providers: [provideMockStore({})],
      declarations: [DictionaryComponent],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NgxDhis2OrgUnitLevelGroupComponent } from './ngx-dhis2-org-unit-level-group.component';
import { NgxDhis2OrgUnitProgressComponent } from '../ngx-dhis2-org-unit-progress/ngx-dhis2-org-unit-progress.component';

import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('NgxDhis2OrgUnitLevelGroupComponent', () => {
  let component: NgxDhis2OrgUnitLevelGroupComponent;
  let fixture: ComponentFixture<NgxDhis2OrgUnitLevelGroupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        NgxDhis2OrgUnitLevelGroupComponent,
        NgxDhis2OrgUnitProgressComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDhis2OrgUnitLevelGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

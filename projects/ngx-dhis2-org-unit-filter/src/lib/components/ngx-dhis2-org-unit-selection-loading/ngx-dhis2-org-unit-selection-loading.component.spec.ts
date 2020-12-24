import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NgxDhis2OrgUnitSelectionLoadingComponent } from './ngx-dhis2-org-unit-selection-loading.component';

describe('NgxDhis2OrgUnitSelectionLoadingComponent', () => {
  let component: NgxDhis2OrgUnitSelectionLoadingComponent;
  let fixture: ComponentFixture<NgxDhis2OrgUnitSelectionLoadingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxDhis2OrgUnitSelectionLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDhis2OrgUnitSelectionLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

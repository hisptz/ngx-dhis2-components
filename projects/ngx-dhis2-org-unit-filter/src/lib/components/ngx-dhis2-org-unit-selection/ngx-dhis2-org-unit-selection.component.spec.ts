import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxDhis2OrgUnitProgressComponent } from '../ngx-dhis2-org-unit-progress/ngx-dhis2-org-unit-progress.component';
import { NgxDhis2OrgUnitTreeItemComponent } from '../ngx-dhis2-org-unit-tree-item/ngx-dhis2-org-unit-tree-item.component';
import { NgxDhis2OrgUnitSelectionComponent } from './ngx-dhis2-org-unit-selection.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { WithOrgUnitLoadingPipe } from '../../pipes/with-org-unit-loading.pipe';

describe('NgxDhis2OrgUnitSelectionComponent', () => {
  let component: NgxDhis2OrgUnitSelectionComponent;
  let fixture: ComponentFixture<NgxDhis2OrgUnitSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [
        NgxDhis2OrgUnitSelectionComponent,
        NgxDhis2OrgUnitProgressComponent,
        NgxDhis2OrgUnitTreeItemComponent,
        WithOrgUnitLoadingPipe,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDhis2OrgUnitSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

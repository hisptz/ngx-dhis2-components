import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxDhis2OrgUnitProgressComponent } from '../ngx-dhis2-org-unit-progress/ngx-dhis2-org-unit-progress.component';
import { NgxDhis2OrgUnitTreeItemComponent } from '../ngx-dhis2-org-unit-tree-item/ngx-dhis2-org-unit-tree-item.component';
import { NgxDhis2OrgUnitSelectionComponent } from './ngx-dhis2-org-unit-selection.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { WithOrgUnitLoadingPipe } from '../../pipes/with-org-unit-loading.pipe';
import { OrgUnitService } from '../../services/org-unit.service';
import { NgxDhis2HttpClientModule } from '@iapps/ngx-dhis2-http-client';
import { OrgUnitLevelService } from '../../services/org-unit-level.service';
import { OrgUnitGroupService } from '../../services/org-unit-group.service';

describe('NgxDhis2OrgUnitSelectionComponent', () => {
  let component: NgxDhis2OrgUnitSelectionComponent;
  let fixture: ComponentFixture<NgxDhis2OrgUnitSelectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        NgxDhis2HttpClientModule.forRoot({
          namespace: 'components',
          version: 1,
          models: {},
        }),
      ],
      declarations: [
        NgxDhis2OrgUnitSelectionComponent,
        NgxDhis2OrgUnitProgressComponent,
        NgxDhis2OrgUnitTreeItemComponent,
        WithOrgUnitLoadingPipe,
      ],
      providers: [OrgUnitService, OrgUnitLevelService, OrgUnitGroupService],
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

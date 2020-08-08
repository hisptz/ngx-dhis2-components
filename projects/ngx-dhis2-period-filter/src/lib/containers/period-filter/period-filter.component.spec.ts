import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodFilterComponent } from './period-filter.component';
import {
  NgxDhis2HttpClientService,
  NgxDhis2HttpClientModule
} from '@iapps/ngx-dhis2-http-client';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DragDropModule } from '@angular/cdk/drag-drop';

describe('PeriodFilterComponent', () => {
  let component: PeriodFilterComponent;
  let fixture: ComponentFixture<PeriodFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatSelectModule,
        MatFormFieldModule,
        MatTooltipModule,
        MatIconModule,
        MatCardModule,
        MatChipsModule,
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        MatButtonToggleModule,
        DragDropModule,
        NgxDhis2HttpClientModule.forRoot({
          namespace: 'hisptz',
          version: 1,
          models: {
            users: 'id',
            organisationUnitLevels: 'id,level',
            organisationUnits: 'id,name,level',
            organisationUnitGroups: 'id',
            dataStore_scorecards: 'id'
          }
        })
      ],
      providers: [],
      declarations: [PeriodFilterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // console.log('component :: ', component);

  // if (component.selectedPeriodType == 'Range') {
  //   it('should have date range period type', () => {
  //     expect(component.currentPeriodFilterType).toEqual('DATE_RANGE');
  //   });
  // } else if (component.selectedPeriodType == 'Relative') {
  //   it('should have relative period type', () => {
  //     expect(component.currentPeriodFilterType).toEqual('RELATIVE');
  //   });
  // } else if (component.selectedPeriodType == 'Fixed') {
  //   it('should have fixed period type', () => {
  //     expect(component.currentPeriodFilterType).toEqual('FIXED');
  //   });
  // } else {
  //   it('should have default as relative period type', () => {
  //     expect(component.currentPeriodFilterType).toEqual('RELATIVE');
  //   });
  // }
});

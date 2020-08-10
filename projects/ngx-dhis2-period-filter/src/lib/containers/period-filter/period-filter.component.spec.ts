import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodFilterComponent } from './period-filter.component';

describe('PeriodFilterComponent', () => {
  let component: PeriodFilterComponent;
  let fixture: ComponentFixture<PeriodFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
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

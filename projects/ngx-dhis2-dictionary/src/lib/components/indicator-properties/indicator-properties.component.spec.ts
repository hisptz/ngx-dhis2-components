import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IndicatorPropertiesComponent } from './indicator-properties.component';

describe('IndicatorPropertiesComponent', () => {
  let component: IndicatorPropertiesComponent;
  let fixture: ComponentFixture<IndicatorPropertiesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicatorPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

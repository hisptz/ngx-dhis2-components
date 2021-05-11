import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProgramIndicatorPropertiesComponent } from './program-indicator-properties.component';

describe('ProgramIndicatorPropertiesComponent', () => {
  let component: ProgramIndicatorPropertiesComponent;
  let fixture: ComponentFixture<ProgramIndicatorPropertiesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramIndicatorPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramIndicatorPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

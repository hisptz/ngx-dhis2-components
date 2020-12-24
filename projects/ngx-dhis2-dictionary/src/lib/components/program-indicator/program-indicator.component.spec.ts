import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProgramIndicatorComponent } from './program-indicator.component';

describe('ProgramIndicatorComponent', () => {
  let component: ProgramIndicatorComponent;
  let fixture: ComponentFixture<ProgramIndicatorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

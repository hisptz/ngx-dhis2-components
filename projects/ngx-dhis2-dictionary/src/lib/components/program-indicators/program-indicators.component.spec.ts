import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProgramIndicatorsComponent } from './program-indicators.component';

describe('ProgramIndicatorsComponent', () => {
  let component: ProgramIndicatorsComponent;
  let fixture: ComponentFixture<ProgramIndicatorsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramIndicatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SwitchingBtnsComponent } from './switching-btns.component';

describe('SwitchingBtnsComponent', () => {
  let component: SwitchingBtnsComponent;
  let fixture: ComponentFixture<SwitchingBtnsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchingBtnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchingBtnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

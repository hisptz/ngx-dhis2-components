import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DictionaryProgressComponent } from './dictionary-progress.component';

describe('DictionaryProgressComponent', () => {
  let component: DictionaryProgressComponent;
  let fixture: ComponentFixture<DictionaryProgressComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DictionaryProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictionaryProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

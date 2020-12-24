import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DictionaryMenuComponent } from './dictionary-menu.component';

describe('DictionaryMenuComponent', () => {
  let component: DictionaryMenuComponent;
  let fixture: ComponentFixture<DictionaryMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DictionaryMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictionaryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

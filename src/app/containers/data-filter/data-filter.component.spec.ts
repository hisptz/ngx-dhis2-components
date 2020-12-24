import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { DataFilterComponent } from './data-filter.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DataFilterComponent', () => {
  let component: DataFilterComponent;
  let fixture: ComponentFixture<DataFilterComponent>;
  let store: MockStore;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [provideMockStore({})],
      declarations: [DataFilterComponent],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

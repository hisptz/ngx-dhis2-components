import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelectionFiltersComponent } from './selection-filters.component';

describe('SelectionFiltersComponent', () => {
  let component: SelectionFiltersComponent;
  let fixture: ComponentFixture<SelectionFiltersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DimensionFilterComponent } from './dimension-filter.component';

describe('DimensionFilterComponent', () => {
  let component: DimensionFilterComponent;
  let fixture: ComponentFixture<DimensionFilterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DimensionFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DimensionFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

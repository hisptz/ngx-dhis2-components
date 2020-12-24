import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MetadataListComponent } from './metadata-list.component';

describe('MetadataListComponent', () => {
  let component: MetadataListComponent;
  let fixture: ComponentFixture<MetadataListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MetadataListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

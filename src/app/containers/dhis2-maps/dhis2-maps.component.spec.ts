import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dhis2MapsComponent } from './dhis2-maps.component';

describe('Dhis2MapsComponent', () => {
  let component: Dhis2MapsComponent;
  let fixture: ComponentFixture<Dhis2MapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dhis2MapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dhis2MapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

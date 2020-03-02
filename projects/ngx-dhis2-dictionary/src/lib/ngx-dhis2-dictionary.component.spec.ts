import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDhis2DictionaryComponent } from './ngx-dhis2-dictionary.component';

describe('NgxDhis2DictionaryComponent', () => {
  let component: NgxDhis2DictionaryComponent;
  let fixture: ComponentFixture<NgxDhis2DictionaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxDhis2DictionaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDhis2DictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

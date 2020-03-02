import { TestBed } from '@angular/core/testing';

import { NgxDhis2DictionaryService } from './ngx-dhis2-dictionary.service';

describe('NgxDhis2DictionaryService', () => {
  let service: NgxDhis2DictionaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxDhis2DictionaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

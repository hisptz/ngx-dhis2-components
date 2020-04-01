import { TestBed } from '@angular/core/testing';

import { NgxDhis2PeriodFilterService } from './ngx-dhis2-period-filter.service';

describe('NgxDhis2PeriodFilterService', () => {
  let service: NgxDhis2PeriodFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxDhis2PeriodFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

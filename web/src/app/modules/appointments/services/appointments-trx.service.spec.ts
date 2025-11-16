import { TestBed } from '@angular/core/testing';

import { AppointmentsTrxService } from './appointments-trx.service';

describe('AppointmentsTrxService', () => {
  let service: AppointmentsTrxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentsTrxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

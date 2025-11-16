import { TestBed } from '@angular/core/testing';

import { DashboardTrxService } from './dashboard-trx.service';

describe('DashboardTrxService', () => {
  let service: DashboardTrxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardTrxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

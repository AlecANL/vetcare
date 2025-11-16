import { TestBed } from '@angular/core/testing';

import { HistoryTrxService } from './history-trx.service';

describe('HistoryTrxService', () => {
  let service: HistoryTrxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryTrxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

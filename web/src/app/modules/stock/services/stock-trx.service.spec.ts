import { TestBed } from '@angular/core/testing';

import { StockTrxService } from './stock-trx.service';

describe('StockTrxService', () => {
  let service: StockTrxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockTrxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

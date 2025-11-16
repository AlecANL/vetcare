import { TestBed } from '@angular/core/testing';

import { InvoiceTrxService } from './invoice-trx.service';

describe('InvoiceTrxService', () => {
  let service: InvoiceTrxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceTrxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

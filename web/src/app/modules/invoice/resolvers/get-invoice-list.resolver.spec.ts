import { TestBed } from '@angular/core/testing';

import { GetInvoiceListResolver } from './get-invoice-list.resolver';

describe('GetInvoiceListResolver', () => {
  let resolver: GetInvoiceListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GetInvoiceListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

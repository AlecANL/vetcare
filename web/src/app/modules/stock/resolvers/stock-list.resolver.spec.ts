import { TestBed } from '@angular/core/testing';

import { StockListResolver } from './stock-list.resolver';

describe('StockListResolver', () => {
  let resolver: StockListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(StockListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

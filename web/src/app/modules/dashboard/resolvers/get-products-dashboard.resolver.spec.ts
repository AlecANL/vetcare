import { TestBed } from '@angular/core/testing';

import { GetProductsDashboardResolver } from './get-products-dashboard.resolver';

describe('GetProductsDashboardResolver', () => {
  let resolver: GetProductsDashboardResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GetProductsDashboardResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

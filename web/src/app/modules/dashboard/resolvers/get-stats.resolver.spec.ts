import { TestBed } from '@angular/core/testing';

import { GetStatsResolver } from './get-stats.resolver';

describe('GetStatsResolver', () => {
  let resolver: GetStatsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GetStatsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

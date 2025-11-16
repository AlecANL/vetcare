import { TestBed } from '@angular/core/testing';

import { HistoryListResolver } from './history-list.resolver';

describe('HistoryListResolver', () => {
  let resolver: HistoryListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(HistoryListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

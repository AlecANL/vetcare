import { TestBed } from '@angular/core/testing';

import { UsersTrxService } from './users-trx.service';

describe('UsersTrxService', () => {
  let service: UsersTrxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersTrxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

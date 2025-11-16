import { TestBed } from '@angular/core/testing';

import { GetAppointmentListResolver } from './get-appointment-list.resolver';

describe('GetAppointmentListResolver', () => {
  let resolver: GetAppointmentListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GetAppointmentListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

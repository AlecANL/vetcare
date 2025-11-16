import { TestBed } from '@angular/core/testing';

import { GetIncommingAppointmentResolver } from './get-incomming-appointment.resolver';

describe('GetIncommingAppointmentResolver', () => {
  let resolver: GetIncommingAppointmentResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GetIncommingAppointmentResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

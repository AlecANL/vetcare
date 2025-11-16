import { TestBed } from '@angular/core/testing';

import { AppointmentUtilsService } from './appointment-utils.service';

describe('AppointmentUtilsService', () => {
  let service: AppointmentUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

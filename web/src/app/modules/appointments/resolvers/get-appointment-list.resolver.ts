import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { AppointmentsTrxService } from '../services/appointments-trx.service';
import { TAppointmentList } from '../interfaces/appointment.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GetAppointmentListResolver implements Resolve<TAppointmentList> {
  constructor(private readonly appointmentTrx: AppointmentsTrxService) {}

  resolve(): Observable<TAppointmentList> {
    return this.appointmentTrx.getList().pipe(
      catchError((error: HttpErrorResponse) => {
        return of([]);
      })
    );
  }
}

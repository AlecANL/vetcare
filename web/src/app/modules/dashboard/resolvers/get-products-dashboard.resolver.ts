import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { DashboardTrxService } from '../services/dashboard-trx.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GetProductsDashboardResolver implements Resolve<Array<any>> {
  constructor(private readonly dashboardTrx: DashboardTrxService) {}

  resolve(): Observable<Array<any>> {
    return this.dashboardTrx.getProducts().pipe(
      catchError((error: HttpErrorResponse) => {
        return of([]);
      })
    );
  }
}

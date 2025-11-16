import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { InvoiceTrxService } from '../services/invoice-trx.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GetInvoiceListResolver implements Resolve<Observable<Array<any>>> {
  constructor(private readonly userTrx: InvoiceTrxService) {}

  resolve(): Observable<Array<any>> {
    return this.userTrx.getUsers().pipe(
      catchError((error: HttpErrorResponse) => {
        return of([]);
      })
    );
  }
}

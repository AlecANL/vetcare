import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { StockTrxService } from '../services/stock-trx.service';
import { TStockList } from '../interfaces/stock.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StockListResolver implements Resolve<TStockList> {
  constructor(private readonly stockTrx: StockTrxService) {}

  resolve(): Observable<TStockList> {
    return this.stockTrx.getList().pipe(
      catchError((error: HttpErrorResponse) => {
        return of([]);
      })
    );
  }
}

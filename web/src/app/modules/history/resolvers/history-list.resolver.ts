import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { HistoryTrxService } from '../services/history-trx.service';
import { THistoryList } from '../interface/history.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HistoryListResolver implements Resolve<THistoryList> {
  constructor(private readonly historyTrx: HistoryTrxService) {}

  resolve(): Observable<THistoryList> {
    return this.historyTrx.getAll().pipe(
      catchError((error: HttpErrorResponse) => {
        return of([]);
      })
    );
  }
}

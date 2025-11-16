import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, Observable, of, throwError } from 'rxjs';
import { UsersTrxService } from '../services/users-trx.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TUserList } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserListResolver implements Resolve<TUserList> {
  constructor(private readonly userTrx: UsersTrxService) {}

  resolve(): Observable<TUserList> {
    return this.userTrx.getUsers().pipe(
      catchError((error: HttpErrorResponse) => {
        return of([]);
      })
    );
  }
}

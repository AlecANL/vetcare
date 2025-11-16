import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InvoiceTrxService {
  constructor(private readonly http: HttpClient) {}

  getUsers() {
    return this.http.get<Array<any>>(`${environment.apiUrl}/invoice`);
  }
}

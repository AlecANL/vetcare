import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardTrxService {
  constructor(private readonly http: HttpClient) {}

  getStats() {
    return this.http.get<Array<any>>(`${environment.apiUrl}/dashboard/stats`);
  }

  getIncommingAppointments() {
    return this.http.get<Array<any>>(
      `${environment.apiUrl}/dashboard/incomming-appointments`
    );
  }

  getProducts() {
    return this.http.get<Array<any>>(
      `${environment.apiUrl}/dashboard/products`
    );
  }
}

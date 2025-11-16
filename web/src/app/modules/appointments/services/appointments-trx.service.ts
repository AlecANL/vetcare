import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TAppointmentList } from '../interfaces/appointment.interface';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsTrxService {
  constructor(private http: HttpClient) {}

  getList() {
    return this.http.get<TAppointmentList>(
      `${environment.apiUrl}/appointments`
    );
  }

  create(body: any) {
    return this.http.post<TAppointmentList>(
      `${environment.apiUrl}/appointments`,
      body
    );
  }

  createInvoice(body: any) {
    return this.http.post<any>(`${environment.apiUrl}/invoice`, body);
  }
}

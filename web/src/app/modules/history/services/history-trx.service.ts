import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ICreateHistoryRequest,
  THistoryList,
} from '../interface/history.interface';

@Injectable({
  providedIn: 'root',
})
export class HistoryTrxService {
  constructor(private readonly http: HttpClient) {}

  getAll() {
    return this.http.get<THistoryList>(`${environment.apiUrl}/history`);
  }

  create(request: ICreateHistoryRequest) {
    const { appointment, ...body } = request;
    return this.http.post(`${environment.apiUrl}/history`, {
      ...body,
      pet_id: appointment.pet.id,
    });
  }
}

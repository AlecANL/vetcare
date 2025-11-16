import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TStockList } from '../interfaces/stock.interface';

@Injectable({
  providedIn: 'root',
})
export class StockTrxService {
  constructor(private readonly http: HttpClient) {}

  getList() {
    return this.http.get<TStockList>(`${environment.apiUrl}/products`);
  }

  addProduct(body: any) {
    return this.http.post(`${environment.apiUrl}/products`, {
      ...body,
      stock: 1,
    });
  }

  addToStock(id: number, quantity: number, comments: string) {
    return this.http.post<TStockList>(`${environment.apiUrl}/products/${id}`, {
      productId: id,
      quantity,
      comments,
      type_movement: 'entrada',
    });
  }
}

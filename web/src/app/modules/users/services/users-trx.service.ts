import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IPartialUser, TUserList } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersTrxService {
  constructor(private readonly http: HttpClient) {}

  getUsers() {
    return this.http.get<TUserList>(`${environment.apiUrl}/users`);
  }

  createUser(user: IPartialUser) {
    return this.http.post<IPartialUser>(`${environment.apiUrl}/users`, {
      ...user,
    });
  }

  update(userId: number, user: IPartialUser) {
    return this.http.patch<IPartialUser>(
      `${environment.apiUrl}/users/${userId}`,
      {
        ...user,
      }
    );
  }

  deleteUser(userId: number) {
    return this.http.delete<IPartialUser>(
      `${environment.apiUrl}/users/${userId}`
    );
  }
}

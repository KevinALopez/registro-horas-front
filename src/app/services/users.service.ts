import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IUser } from '../interfaces/iuser';

type LoginBody = {
  username: string;
  password: string;
};

type LoginResponse = {
  message: string;
  token?: string;
};

type RegisterResponse = {
  message: string;
  id?: string;
};

type UpdateResponse = {
  message: string;
  updatedUser: IUser;
};

type DeleteResponse = {
  message: string;
};

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api';

  login(credentials: LoginBody) {
    return lastValueFrom(
      this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, credentials)
    );
  }

  register(user: IUser) {
    return lastValueFrom(
      this.http.post<RegisterResponse>(`${this.baseUrl}/users/register`, user)
    );
  }

  getAll() {
    return lastValueFrom(this.http.get<IUser[]>(`${this.baseUrl}/users`));
  }

  getById(id: number) {
    return lastValueFrom(this.http.get<IUser>(`${this.baseUrl}/users/${id}`));
  }

  updateById(id: number, updatedUser: IUser) {
    return lastValueFrom(
      this.http.put<UpdateResponse>(`${this.baseUrl}/users/${id}`, updatedUser)
    );
  }

  deleteById(id: number) {
    return lastValueFrom(
      this.http.delete<DeleteResponse>(`${this.baseUrl}/users/${id}`)
    );
  }
}

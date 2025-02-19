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
}

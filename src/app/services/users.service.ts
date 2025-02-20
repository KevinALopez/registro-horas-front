import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, BehaviorSubject } from 'rxjs';
import { IUser } from '../interfaces/iuser';
import { User } from '../interfaces/user.interface';

type LoginBody = {
  username: string;
  password: string;
};

type LoginResponse = {
  message: string;
  token?: string;
  id: number;
  username: string;
  // otros campos que el backend devuelva
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
  updatePassword(
    userId: number,
    arg1: { currentPassword: string; newPassword: string }
  ) {
    throw new Error('Method not implemented.');
  }

  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api';
  private loggedUserSubject = new BehaviorSubject<User | null>(null);
  loggedUser$ = this.loggedUserSubject.asObservable();

  constructor() {
    // Intentar recuperar usuario del localStorage al iniciar
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.loggedUserSubject.next(JSON.parse(savedUser));
    }
  }

  getLoggedUser(): User | null {
    return this.loggedUserSubject.value;
  }

  login(credentials: LoginBody) {
    return lastValueFrom(
      this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, credentials)
    ).then((response) => {
      if (response.token) {
        const user: User = {
          id: response.id,
          username: response.username,
        };
        console.log('Usuario guardado:', user);
        this.loggedUserSubject.next(user);
        localStorage.setItem('user', JSON.stringify(user));
      }
      return response;
    });
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

  updateById(id: number, updatedUser: IUser | User) {
    return lastValueFrom(
      this.http.put<UpdateResponse>(`${this.baseUrl}/users/${id}`, updatedUser)
    ).then((response) => {
      if (this.loggedUserSubject.value?.id === id) {
        this.loggedUserSubject.next({
          ...this.loggedUserSubject.value,
          ...updatedUser,
        });
      }
      return response;
    });
  }

  deleteById(id: number) {
    return lastValueFrom(
      this.http.delete<DeleteResponse>(`${this.baseUrl}/users/${id}`)
    );
  }

  logout(): Promise<void> {
    return new Promise((resolve) => {
      localStorage.removeItem('user');
      this.loggedUserSubject.next(null);
      resolve();
    });
  }
}

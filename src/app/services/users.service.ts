import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IUser } from '../interfaces/iuser';
import { User } from '../interfaces/user.interface';
import { jwtDecode } from 'jwt-decode';
import { CustomPayload } from '../guards/admin.guard';
import { availableTime } from '../pages/registro-horas-proyecto/registrar-horas-form/registrar-horas-form.component';
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

  updateById(id: number, updatedUser: IUser | User) {
    return lastValueFrom(
      this.http.put<UpdateResponse>(`${this.baseUrl}/users/${id}`, updatedUser)
    );
  }

  deleteById(id: number) {
    return lastValueFrom(
      this.http.delete<DeleteResponse>(`${this.baseUrl}/users/${id}`)
    );
  }

  isLogged() {
    if (localStorage.getItem('store_token')) {
      return true;
    }
    return false;
  }

  isAdmin() {
    const token = localStorage.getItem('store_token')!;
    const payload = jwtDecode<CustomPayload>(token);
    if (payload.role !== 'admin') {
      return false;
    }
    return true;
  }

  changePassword(currentPassword: string, newPassword: string) {
    console.log('Service - changePassword iniciado:', {
      currentPassword,
      newPassword,
    });

    const token = localStorage.getItem('store_token');

    return lastValueFrom(
      this.http.put<{ message: string }>(
        `${this.baseUrl}/users/change-password`, // 📌 Ya no se necesita el ID en la URL
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } } // 📌 Token en headers
      )
    )
      .then((response) => {
        console.log('Service - Respuesta exitosa:', response);
        return response;
      })
      .catch((error) => {
        console.error('Service - Error en changePassword:', error);
      });
  }

  getLoggedUser() {
    const token = localStorage.getItem('store_token')!;
    const payload = jwtDecode<CustomPayload>(token);

    return this.getById(payload.id);
  }

  getUnassignedTime() {
    return lastValueFrom(
      this.http.get<availableTime>(`${this.baseUrl}/hours/unassigned`)
    );
  }
}

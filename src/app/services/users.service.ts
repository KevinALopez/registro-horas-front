import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/iuser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = `${environment.apiUrl}/users`;
    apiService = inject(ApiService);
    private httpClient = inject(HttpClient);

  constructor() { }

  getUserById(id: number): Observable<IUser> {
    console.log(this.baseUrl);
    return this.httpClient.get<IUser>(`${this.baseUrl}/${id}`);
  }

}

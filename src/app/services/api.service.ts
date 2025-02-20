import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProject } from '../interfaces/iproject';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
   private url = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  addProject(project: IProject): Observable<any> {
    return this.http.post<IProject>('http://localhost:3000/api/projects', project);
  }
  
  
}

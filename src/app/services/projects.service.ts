import { inject, Injectable } from '@angular/core';
import { IProject } from '../interfaces/iproject';
import { ApiService } from '../../app/services/api.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private baseUrl = `${environment.apiUrl}/projects`;
  apiService = inject(ApiService);
  private httpClient = inject(HttpClient);

  constructor() { }

   // Agrega un nuevo proyecto
   //llega el objeto
   insertProject(project: IProject) {
    console.log(project);
    
    return lastValueFrom(
      this.httpClient.post<IProject>(this.baseUrl, project)
    );
   
  }
}

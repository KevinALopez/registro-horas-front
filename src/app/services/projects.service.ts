import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProject } from '../interfaces/iproject';
import { lastValueFrom } from 'rxjs';

type CreateResponse = {
  message: string;
  projectId: number;
};

type DeleteResponse = {
  message: string;
};
type UpdateResponse = {
  message: string;
  updatedProject: IProject;
};

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api/projects';

  createNewProject(project: IProject) {
    return lastValueFrom(
      this.http.post<CreateResponse>(`${this.baseUrl}`, project)
    );
  }

  getAll() {
    return lastValueFrom(
      this.http.get<{ data: IProject[] }>(`${this.baseUrl}`)
    );
  }

  getById(id: number) {
    return lastValueFrom(this.http.get<IProject>(`${this.baseUrl}/${id}`));
  }

  updateById(id: number, updatedProject: IProject) {
    return lastValueFrom(
      this.http.put<UpdateResponse>(`${this.baseUrl}/${id}`, updatedProject)
    );
  }

  deleteById(id: number) {
    return lastValueFrom(
      this.http.delete<DeleteResponse>(`${this.baseUrl}/${id}`)
    );
  }
}

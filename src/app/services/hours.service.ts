import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IHourOnProject } from '../interfaces/ihour';

@Injectable({
  providedIn: 'root',
})
export class HoursService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api/hours';

  getHoursInMonth(month: number, year: number) {
    return lastValueFrom(
      this.http.get<{ data: IHourOnProject[] }>(
        `${this.baseUrl}/${month}/${year}`
      )
    );
  }
}

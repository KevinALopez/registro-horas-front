import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IHourOnProject } from '../interfaces/ihour';

type RegisterStartResponse = {
  message: string;
  id: number;
};

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

  registerStart(startTime: string) {
    return lastValueFrom(
      this.http.post<RegisterStartResponse>(`${this.baseUrl}/start`, {
        start: startTime,
      })
    );
  }

  registerEnd(endTime: string, id: number) {
    return lastValueFrom(
      this.http.post<{ message: string }>(`${this.baseUrl}/end`, {
        id,
        end: endTime,
      })
    );
  }
}

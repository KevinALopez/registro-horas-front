import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IHourOnProject } from '../interfaces/ihour';

type RegisterStartResponse = {
  message: string;
  id: number;
};

type RegisterPauseStartResponse = {
  message: string;
  id: number;
};

type HourByDateReponse = {
  data: {
    hours: number;
    username: string;
  }[];
};

type RegisetHoursOnProjectPayload = {
  userId: number;
  projectId: number;
  date: string;
  hours: number;
};

type IncompleteShiftResponse = {
  id: number;
  userid: number;
  start: string;
  end: null;
};

type IncompletePauseResponse = {
  id: number;
  user_id: number;
  start: string;
  end: null;
  type: string;
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

  registerPauseStart(startTime: string, type: string) {
    return lastValueFrom(
      this.http.post<RegisterPauseStartResponse>(
        `${this.baseUrl}/pause/start`,
        {
          type,
          start: startTime,
        }
      )
    );
  }

  registerPauseEnd(endTime: string, id: number) {
    return lastValueFrom(
      this.http.patch<{ message: string }>(`${this.baseUrl}/pause/end`, {
        id,
        end: endTime,
      })
    );
  }

  getHoursByDate(date: string) {
    return lastValueFrom(
      this.http.post<HourByDateReponse>(`${this.baseUrl}`, { date })
    );
  }

  registerHoursOnProject({
    userId,
    projectId,
    date,
    hours,
  }: RegisetHoursOnProjectPayload) {
    return lastValueFrom(
      this.http.post<{ message: string }>(`${this.baseUrl}/projects`, {
        userId,
        projectId,
        date,
        hours,
      })
    );
  }

  getIncompleteShift() {
    return lastValueFrom(
      this.http.get<IncompleteShiftResponse>(`${this.baseUrl}/shift/incomplete`)
    );
  }

  getIncompletePause() {
    return lastValueFrom(
      this.http.get<IncompletePauseResponse>(
        `${this.baseUrl}/shift/pause/incomplete`
      )
    );
  }
}

{/*import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface BootstrapModal {
  show(): void;
  hide(): void;
  dispose(): void;
}

interface TimeRecord {
  checkIn: Date;
  checkOut: Date;
  breaks?: {
    start: Date;
    end: Date;
    duration: number;
  }[];
}

interface CalendarDay {
  date: Date;
  otherMonth: boolean;
  hasRecords: boolean;
  records?: TimeRecord;
  totalHours?: string;
}

@Component({
  selector: 'app-hours-recorded',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hours-recorded.component.html',
  styleUrls: ['./hours-recorded.component.css']
})
export class HoursRecordedComponent implements OnInit {
  weekDays: string[] = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  currentDate: Date = new Date();
  calendarDays: CalendarDay[] = [];
  selectedDay: CalendarDay | null = null;
  private modal: BootstrapModal | null = null;

  ngOnInit() {
    this.generateCalendarDays();
    this.initModal();
  }

  private initModal() {
    const modalElement = document.getElementById('dayDetailsModal');
    if (modalElement) {
      // @ts-ignore
      this.modal = new window.bootstrap.Modal(modalElement);
    }
  }

  generateCalendarDays() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    // Primer día del mes
    const firstDay = new Date(year, month, 1);
    // Último día del mes
    const lastDay = new Date(year, month + 1, 0);

    // Días del mes anterior para completar la primera semana
    const daysFromPrevMonth = firstDay.getDay();
    const prevMonth = new Date(year, month - 1);

    this.calendarDays = [];

    // Agregar días del mes anterior
    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonth.getDate() - i);
      this.calendarDays.push({
        date,
        otherMonth: true,
        hasRecords: false
      });
    }

    // Agregar días del mes actual
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      // Aquí simularemos algunos registros aleatorios
      const hasRecords = Math.random() > 0.5;

      this.calendarDays.push({
        date,
        otherMonth: false,
        hasRecords,
        totalHours: hasRecords ? this.generateRandomHours() : undefined,
        records: hasRecords ? this.generateRandomRecords(date) : undefined
      });
    }

    // Agregar días del mes siguiente para completar la última semana
    const daysFromNextMonth = 42 - this.calendarDays.length; // 42 = 6 semanas * 7 días
    for (let i = 1; i <= daysFromNextMonth; i++) {
      const date = new Date(year, month + 1, i);
      this.calendarDays.push({
        date,
        otherMonth: true,
        hasRecords: false
      });
    }
  }

  previousMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1
    );
    this.generateCalendarDays();
  }

  nextMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1
    );
    this.generateCalendarDays();
  }

  showDayDetails(day: CalendarDay) {
    if (day.hasRecords) {
      this.selectedDay = day;
      this.modal?.show();
    }
  }

  private generateRandomHours(): string {
    const hours = Math.floor(Math.random() * 4) + 5; // 5-8 horas
    const minutes = Math.floor(Math.random() * 60);
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  }

  private generateRandomRecords(date: Date): TimeRecord {
    const checkIn = new Date(date.setHours(9, 0)); // 9:00 AM
    const checkOut = new Date(date.setHours(18, 0)); // 6:00 PM

    const breaks = [{
      start: new Date(date.setHours(13, 0)), // 1:00 PM
      end: new Date(date.setHours(14, 0)), // 2:00 PM
      duration: 60
    }];

    return {
      checkIn,
      checkOut,
      breaks
    };
  }

  // Método auxiliar para verificar registros
  hasValidRecords(day: CalendarDay): boolean {
    return day.hasRecords && day.records !== undefined;
  }

  // Método auxiliar para verificar breaks
  hasValidBreaks(records: TimeRecord): boolean {
    return records.breaks !== undefined && records.breaks.length > 0;
  }
}*/
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoursService } from '../../services/hours.service';
import { jwtDecode } from 'jwt-decode';
import { CustomPayload } from '../../guards/admin.guard';

interface BootstrapModal {
  show(): void;
  hide(): void;
  dispose(): void;
}

interface TimeRecord {
  checkIn: Date;
  checkOut: Date;
  breaks?: { start: Date; end: Date; duration: number }[];
  totalHours?: string;
}

interface CalendarDay {
  date: Date;
  otherMonth: boolean;
  hasRecords: boolean;
  records?: TimeRecord;
  totalHours?: string;
}

@Component({
  selector: 'app-hours-recorded',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hours-recorded.component.html',
  styleUrls: ['./hours-recorded.component.css']
})
export class HoursRecordedComponent implements OnInit {
  weekDays: string[] = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  currentDate: Date = new Date();
  calendarDays: CalendarDay[] = [];
  selectedDay: CalendarDay | null = null;
  private modal: BootstrapModal | null = null;
  private userId: number | null = null;

  constructor(private hoursService: HoursService) { }

  ngOnInit() {
    this.extractUserId();
    this.generateCalendarDays();
    this.initModal();
  }

  private extractUserId() {
    const token = localStorage.getItem('store_token');
    if (token) {
      const payload = jwtDecode<CustomPayload>(token);
      this.userId = payload.id;
    }
  }

  private initModal() {
    const modalElement = document.getElementById('dayDetailsModal');
    if (modalElement) {
      // @ts-ignore
      this.modal = new window.bootstrap.Modal(modalElement);
    }
  }

  generateCalendarDays() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth() + 1;

    if (!this.userId) return;

    this.hoursService.getHoursInMonth(month, year).then(response => {
      console.log('🔍 API Response:', response);
      const hoursData = response.data.filter(record => record.user.userId === this.userId);
      const hoursMap = new Map<string, TimeRecord>();

      hoursData.forEach(record => {
        console.log('📌 Procesando record:', record);

        if (!record || !record.dateTime) {
          console.warn('⚠️ Registro inválido:', record);
          return;
        }

        // Verificar si record.hours es un objeto
        if (typeof record.hours !== 'object' || record.hours === null) {
          console.warn('⚠️ El campo "hours" no es un objeto:', record.hours);
          return;
        }

        try {
          const { start, end, breaks } = record.hours as any; // Forzar a tratarlo como un objeto

          const startTime = start ? new Date(`${record.dateTime}T${start}`) : null;
          const endTime = end ? new Date(`${record.dateTime}T${end}`) : null;
          const formattedBreaks = Array.isArray(breaks) ? breaks : [];

          if (startTime && endTime) {
            hoursMap.set(record.dateTime, {
              checkIn: startTime,
              checkOut: endTime,
              breaks: formattedBreaks,
              totalHours: this.calculateHours(start, end)
            });
          }
        } catch (error) {
          console.error('🚨 Error procesando registro:', record, error);
        }
      });


      this.fillCalendar(year, month, hoursMap);
    }).catch(error => {
      console.error('🚨 Error fetching hours:', error);
    });
  }

  private calculateHours(start?: string, end?: string): string {
    if (!start || !end) return '0h 0m';
    const startTime = new Date(`1970-01-01T${start}`);
    const endTime = new Date(`1970-01-01T${end}`);
    const totalMinutes = (endTime.getTime() - startTime.getTime()) / 60000;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  }

  private fillCalendar(year: number, month: number, hoursMap: Map<string, TimeRecord>) {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const daysFromPrevMonth = firstDay.getDay();
    const prevMonth = new Date(year, month - 2);

    this.calendarDays = [];

    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      const date = new Date(year, month - 2, prevMonth.getDate() - i);
      this.calendarDays.push({ date, otherMonth: true, hasRecords: false });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const dateStr = `${year}-${month.toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
      const date = new Date(year, month - 1, i);
      const record = hoursMap.get(dateStr);

      this.calendarDays.push({
        date,
        otherMonth: false,
        hasRecords: !!record,
        totalHours: record?.totalHours,
        records: record
      });
    }
  }

  previousMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1
    );
    this.generateCalendarDays();
  }

  nextMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1
    );
    this.generateCalendarDays();
  }

  showDayDetails(day: CalendarDay) {
    if (day.hasRecords) {
      this.selectedDay = day;
      this.modal?.show();
    }
  }
}

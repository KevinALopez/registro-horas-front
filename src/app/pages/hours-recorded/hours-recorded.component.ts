import { Component, OnInit } from '@angular/core';
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
}

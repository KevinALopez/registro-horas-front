import { Component, inject } from '@angular/core';
import { formatDate } from '@angular/common';
import { HoursService } from '../../../services/hours.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stopwatch',
  imports: [],
  templateUrl: './stopwatch.component.html',
  styleUrl: './stopwatch.component.css',
})
export class StopwatchComponent {
  counter!: number;
  formattedTime: string = '00:00:00';
  running: boolean = false;
  startText: string = 'Comenzar Jornada';
  pauseText: string = 'Iniciar Pausa';
  timerRef: any;

  hoursService = inject(HoursService);
  startId: number = -1;

  async startTimer($event: any) {
    if (this.running) return this.logHours();

    const startTime = Date.now() - (this.counter || 0);

    try {
      const formattedStarTime = formatDate(
        startTime,
        'yyyy-MM-dd HH:mm:ss',
        'en-US'
      );
      const { id } = await this.hoursService.registerStart(formattedStarTime);
      this.startId = id;
    } catch ({ message }: any) {
      Swal.fire('Error', message, 'error');
      return;
    }

    this.running = !this.running;
    this.startText = 'Finalizar Jornada';

    this.timerRef = setInterval(() => {
      this.counter = Date.now() - startTime;
      const elapsedTime = new Date(0, 0, 0, 0, 0, 0, this.counter);
      this.formattedTime = formatDate(elapsedTime, 'HH:mm:ss', 'en-US');
    }, 1000);
  }

  startPause() {}

  logHours() {
    try {
      const formattedEndTime = formatDate(
        Date.now(),
        'yyyy-MM-dd HH:mm:ss',
        'en-US'
      );
      this.hoursService.registerEnd(formattedEndTime, this.startId);
      this.startId = -1;
    } catch ({ message }: any) {
      Swal.fire('Error', message, 'error');
      return;
    }

    this.running = !this.running;
    this.formattedTime = '00:00:00';
    clearInterval(this.timerRef);
    this.startText = 'Comenzar Jornada';

    Swal.fire('Jornada finalizada', 'Gracias por tu trabajo', 'success');
  }

  ngOnDestroy() {
    clearInterval(this.timerRef);
  }
}

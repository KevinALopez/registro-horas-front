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
  timerRef: any;
  startId: number = -1;

  counterPause!: number;
  formattedTimePause: string = '00:00:00';
  runningPause: boolean = false;
  pauseText: string = 'Iniciar Pausa';
  timerRefPause: any;
  startIdPause: number = -1;
  canPause: boolean = false;

  hoursService = inject(HoursService);

  async ngOnInit() {
    try {
      const incompleteShift = await this.hoursService.getIncompleteShift();
      this.counter = Date.now() - new Date(incompleteShift.start).getTime();
      this.formattedTime = formatDate(this.counter, 'HH:mm:ss', 'en-US', 'UTC');
      this.startId = incompleteShift.id;
      this.startTimer();
    } catch ({ message }: any) {
      console.log(message);
      return;
    }

    try {
      const incompletePause = await this.hoursService.getIncompletePause();
      this.counterPause =
        Date.now() - new Date(incompletePause.start).getTime();
      this.formattedTimePause = formatDate(
        this.counterPause,
        'HH:mm:ss',
        'en-US',
        'UTC'
      );
      this.startIdPause = incompletePause.id;
      this.startPause();
    } catch ({ message }: any) {
      console.log(message);
    }
  }

  async startTimer() {
    if (this.running) return this.logHours();

    const startTime = Date.now() - (this.counter || 0);

    try {
      const formattedStarTime = formatDate(
        startTime,
        'yyyy-MM-dd HH:mm:ss',
        'en-US'
      );

      if (!this.runningPause && this.startId === -1) {
        const { id } = await this.hoursService.registerStart(formattedStarTime);
        this.startId = id;
      }
    } catch ({ message }: any) {
      Swal.fire('Error', message, 'error');
      return;
    }

    this.running = !this.running;
    this.canPause = !this.canPause;
    this.startText = 'Finalizar Jornada';

    this.timerRef = setInterval(() => {
      this.counter = Date.now() - startTime;
      const elapsedTime = new Date(0, 0, 0, 0, 0, 0, this.counter);
      this.formattedTime = formatDate(elapsedTime, 'HH:mm:ss', 'en-US');
    }, 1000);
  }

  async startPause() {
    if (this.runningPause) return this.logPauseHours();

    const startTime = Date.now() - (this.counterPause || 0);

    try {
      const formattedStarTime = formatDate(
        startTime,
        'yyyy-MM-dd HH:mm:ss',
        'en-US'
      );
      if (this.startIdPause === -1) {
        const { id } = await this.hoursService.registerPauseStart(
          formattedStarTime,
          'break'
        );
        this.startIdPause = id;
      }
    } catch ({ message }: any) {
      Swal.fire('Error', message, 'error');
      return;
    }

    clearInterval(this.timerRef);
    this.running = !this.running;

    this.runningPause = !this.runningPause;
    this.pauseText = 'Finalizar Pausa';

    this.timerRefPause = setInterval(() => {
      this.counterPause = Date.now() - startTime;
      const elapsedTime = new Date(0, 0, 0, 0, 0, 0, this.counterPause);
      this.formattedTimePause = formatDate(elapsedTime, 'HH:mm:ss', 'en-US');
    }, 1000);
  }

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
    this.canPause = false;
    this.formattedTime = '00:00:00';
    clearInterval(this.timerRef);
    this.counter = 0;
    this.startText = 'Comenzar Jornada';

    Swal.fire('Jornada finalizada', 'Gracias por tu trabajo', 'success');
  }

  logPauseHours() {
    try {
      const formattedEndTime = formatDate(
        Date.now(),
        'yyyy-MM-dd HH:mm:ss',
        'en-US'
      );
      this.hoursService.registerPauseEnd(formattedEndTime, this.startIdPause);
      this.startIdPause = -1;
    } catch ({ message }: any) {
      Swal.fire('Error', message, 'error');
      return;
    }

    this.startTimer();

    this.runningPause = !this.runningPause;
    this.formattedTimePause = '00:00:00';
    this.pauseText = 'Iniciar Pausa';
    clearInterval(this.timerRefPause);
    this.counterPause = 0;
  }

  ngOnDestroy() {
    clearInterval(this.timerRef);
    clearInterval(this.timerRefPause);
  }
}

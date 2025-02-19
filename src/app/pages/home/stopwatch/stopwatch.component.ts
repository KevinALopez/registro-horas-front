import { Component } from '@angular/core';
import { formatDate } from '@angular/common';

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
  startText: string = 'Comenzar';
  pauseText: string = 'Pausa';
  timerRef: any;

  startTimer($event: any) {
    if (this.running) return this.logHours();

    this.running = !this.running;

    this.startText = 'Finalizar';
    const startTime = Date.now() - (this.counter || 0);

    this.timerRef = setInterval(() => {
      this.counter = Date.now() - startTime;
      const elapsedTime = new Date(0, 0, 0, 0, 0, 0, this.counter);
      this.formattedTime = formatDate(elapsedTime, 'HH:mm:ss', 'en-US');
    }, 1000);
  }

  startPause() {}

  logHours() {}

  ngOnDestroy() {
    clearInterval(this.timerRef);
  }
}

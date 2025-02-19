import { Component } from '@angular/core';
import { StopwatchComponent } from './stopwatch/stopwatch.component';
import { HeaderComponent } from '../../component/header/header.component';

@Component({
  selector: 'app-home',
  imports: [StopwatchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent { }

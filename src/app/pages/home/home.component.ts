import { Component } from '@angular/core';
import { StopwatchComponent } from './stopwatch/stopwatch.component';
import { NavSidebarComponent } from '../../components/header/nav-sidebar/nav-sidebar.component';

@Component({
  selector: 'app-home',
  imports: [StopwatchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}

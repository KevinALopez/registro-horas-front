import { Component } from '@angular/core';
import { StopwatchComponent } from './stopwatch/stopwatch.component';
import { NavSidebarComponent } from '../../component/nav-sidebar/nav-sidebar.component';



@Component({
  selector: 'app-home',
  imports: [NavSidebarComponent, StopwatchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent { }

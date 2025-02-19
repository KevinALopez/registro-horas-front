import { Component, inject } from '@angular/core';
import { StopwatchComponent } from './stopwatch/stopwatch.component';
import { HeaderComponent } from '../../component/header/header.component';
import { HttpClient } from '@angular/common/http';
import { ProjectsService } from '../../services/projects.service';
import { IProject } from '../../interfaces/iproject';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [StopwatchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}

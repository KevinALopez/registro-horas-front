import { Component, inject, Input, input } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser';
import { CardComponent } from '../../components/card/card.component';
import { ProjectsService } from '../../services/projects.service';
import {
  HoursOnProjectsResponse,
  HoursService,
} from '../../services/hours.service';
import { formatDate } from '@angular/common';

type data = {
  id: number;
  hours: number;
  date: string;
  project: {
    id: number;
    name: string;
  };
};

@Component({
  selector: 'app-profile',
  imports: [CardComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  userService = inject(UsersService);
  hoursProject = inject(HoursService);
  loggedUser!: IUser;
  ide?: number;
  hoursData: data[] = [];
  contador: number = 0;
  numeroIncidencias: number = 0;

  async ngOnInit(): Promise<void> {
    try {
      this.loggedUser = await this.userService.getLoggedUser();
      this.ide = this.loggedUser.id;
      const { data } = await this.hoursProject.getHoursOnProjects();
      this.hoursData = data;
      this.getTotalHoras();
    } catch (error) {}
  }
  getTotalHoras() {
    this.contador = 0;
    this.numeroIncidencias = 0;
    this.hoursData.forEach((element) => {
      this.contador += Number(element.hours);
      if (element.hours > 8) {
        this.numeroIncidencias += Number(element.hours - 8);
      }
    });
  }

  getFormatDate(date: string) {
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  }
}

import { Component, inject, Input, input } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser';
import { CardComponent } from "../../components/card/card.component";
import { ProjectsService } from '../../services/projects.service';
import { HoursService } from '../../services/hours.service';

@Component({
  selector: 'app-profile',
  imports: [CardComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
    userService = inject(UsersService);
    //projectService = inject(ProjectsService);
    hoursProject = inject(HoursService);
    loggedUser!: IUser;
    ide? :number;
    


   async ngOnInit(): Promise<void> {
    this.loggedUser = await this.userService.getLoggedUser();
    this.ide = this.loggedUser.id;
      console.error('User ID is undefined');
  }
}

import { Component, inject } from '@angular/core';
import { IUser } from '../../interfaces/iuser';
import { UsersService } from '../../services/users.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  userService = inject(UsersService);
  user? : IUser
  router = inject(Router);
  route = inject(ActivatedRoute);


  viewUser(id: number): void {
    this.userService.getUserById(id).subscribe((user: IUser) => {
      this.user = user;
      console.log(user)
    });

  }
  ngOnInit(): void {
    console.log('init');
    const id = this.route.snapshot.paramMap.get('id')!;
    this.viewUser(Number(id));
  }

}

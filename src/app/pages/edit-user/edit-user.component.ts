import { UsersService } from './../../services/users.service';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../component/header/header.component';
import { FooterComponent } from '../../component/footer/footer.component';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../interfaces/iuser';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-edit-user',
  imports: [HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
  user: IUser = {
    username: '',
    email: '',
    password: '',
    role: '',
    contract: ''
  }
  userId!: number;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(this.userId)) {
      this.usersService.getById(this.userId).then((data) => {
        this.user = data;
      }).catch(() => {
        alert('Error al obtener los datos del usuario');
      });
    } else {
      alert('ID de usuario no válido');
      this.router.navigate(['/users']);
    }
  }

  onSubmit(): void {
    if (this.user) {
      // Si no se proporciona una nueva contraseña, eliminar el campo password
      if (!this.user.password) {
        delete this.user.password;
      }

      this.usersService.updateById(this.userId, this.user).then(() => {
        alert('Usuario actualizado correctamente');
        this.router.navigate(['/users']);
      }).catch(() => {
        alert('Error al actualizar el usuario');
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }
}




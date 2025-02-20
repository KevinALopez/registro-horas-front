import { UsersService } from './../../services/users.service';
import { Component, inject, Input } from '@angular/core';
import { HeaderComponent } from '../../component/header/header.component';
import { FooterComponent } from '../../component/footer/footer.component';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  imports: [HeaderComponent, FooterComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  editUserForm: FormGroup;
  userService = inject(UsersService)
  router = inject(Router)
  @Input() userId: number = 0;

  constructor() {
    this.editUserForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6),
      Validators.maxLength(20)]),
      role: new FormControl('', [Validators.required]),
      contract: new FormControl('', [Validators.required]),
    })
  }

  async ngOnInit() {

    const userId = this.userId
    const user = await this.userService.getById(this.userId);
    const { username, email, password, role, contract } = user!;
    this.editUserForm.setValue({ username, email, password, role, contract });
  }
  async onSubmit() {
    try {
      const userId = await this.userService.updateById(this.userId
        , this.editUserForm.value);
      Swal.fire('Edicion', `${this.editUserForm.value.username} editado correctamente`, 'success');
      this.router.navigateByUrl('/users');
    }
    catch (error) {
      Swal.fire('Edicion', 'ha ocurrido un error. Vuelve a intentarlo mas tarde', 'error');
    }

  }

  cancel() {
    this.router.navigateByUrl('/users');
  }
}



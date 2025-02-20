import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../app/environments/environment';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import Swal from 'sweetalert2';
import { inject } from '@angular/core';

export interface CustomPayload extends JwtPayload {
  userId: string;
  userRole: string;
}

export const adminGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  if (localStorage.getItem('store_token')) {
    return true;
  } else {
    Swal.fire('No tienes permisos para entrar aqui')
    router.navigate(['/home']);
    return false
  }

  /*   const router = inject(Router);
  
    const token = localStorage.getItem('store_token')!;
  
    const payload = jwtDecode<CustomPayload>(token);
  
    if (payload.userRole !== 'admin') {
      Swal.fire('Sin autorización', 'Debes ser usuario admin', 'warning');
      router.navigateByUrl('/home');
      return false;
    }
  
    return true; */
};
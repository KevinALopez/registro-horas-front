import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import Swal from 'sweetalert2';
import { inject } from '@angular/core';

export interface CustomPayload extends JwtPayload {
  username: string;
  role: string;
}

export const adminGuard: CanActivateFn = async (route, state) => {

  const router = inject(Router);

  const token = localStorage.getItem('store_token')!;

  const payload = jwtDecode<CustomPayload>(token);

  if (payload.role !== 'admin') {
    await Swal.fire('Sin autorización', 'Debes ser usuario admin', 'warning');
    router.navigateByUrl('/home');
    return false;
  }

  return true;
};

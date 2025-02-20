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
  const router = inject(Router);

  const token = localStorage.getItem(environment.tokenName)!;

  const payload = jwtDecode<CustomPayload>(token);

  if (payload.userRole !== 'admin') {
    Swal.fire('Sin autorización', 'Debes ser usuario admin', 'warning');
    router.navigateByUrl('/projects');
    return false;
  }

  return true;
};

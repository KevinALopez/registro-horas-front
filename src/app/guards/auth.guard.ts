import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../app/environments/environment';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  const token = localStorage.getItem(environment.tokenName);

  if (!token) {
    router.navigateByUrl('/login');
    return false;
  }

  // TODO: Comprobar si el token es correcto

  return true;
};
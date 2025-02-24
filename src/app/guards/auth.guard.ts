import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('store_token');

  if (!token) {
    router.navigateByUrl('/login');
    return false;
  }

  return true;
};

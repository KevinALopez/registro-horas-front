import { CanActivateFn, Router } from '@angular/router';
/* import { environment } from '../../app/environments/environment'; */
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  let router = inject(Router);
  /* 
    const token = localStorage.getItem(environment.tokenName); */

  if (localStorage.getItem('store_token')) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }

}

/* if (!token) {
  router.navigateByUrl('/login');
  return false;
}
*/
// TODO: Comprobar si el token es correcto

/* return true;
}; */
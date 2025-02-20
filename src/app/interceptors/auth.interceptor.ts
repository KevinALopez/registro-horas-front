import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../app/environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem(environment.tokenName);

  if (token) {
    const reqToken = req.clone({
      setHeaders: {
        'Authorization': token
      }
    });
    return next(reqToken);
  }

  return next(req);
};
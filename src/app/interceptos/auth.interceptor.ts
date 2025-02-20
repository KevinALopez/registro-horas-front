import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // For testing

  const token = localStorage.getItem('store_token');

  if (token) {
    const reqToken = req.clone({
      setHeaders: {
        Authorization: token,
      },
    });
    return next(reqToken);
  }

  return next(req);
};

import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // For testing
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczOTk2MzgxN30.aXIexD2A0CqdIVVd548y_H45vZog6mXJiXl06mLZbEM';

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

import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // For testing

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0MDA3NTI2OX0.MCu6G2z_Hq8NfCutlfDJmA_aEHDZngKvtIbvrSfG4xE";
  if (token) {
    const reqToken = req.clone({
      setHeaders: {
        Authorization: token,
      },
    });
    return next(reqToken);
  }

  return next(req);

}

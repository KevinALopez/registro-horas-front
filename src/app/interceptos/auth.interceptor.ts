import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // For testing

  const token = "yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0MDA1OTk0OH0.r7tzmrEsuRptKUKKy7Ktml50Hok42QeNrE7nJ2RQ7d4";
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

import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // For testing
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0MDA1OTYyN30.N0Y89w7DYLbgcYC3R6Kb-nF0YkjdB3spVKtQ_MjW71A'
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
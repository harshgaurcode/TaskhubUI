import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const Token = localStorage.getItem('Token');

  const cloneRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${Token}`,
    },
  });

  return next(cloneRequest);
};

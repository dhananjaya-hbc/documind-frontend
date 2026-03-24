// src/app/interceptors/auth.interceptor.ts

import { HttpInterceptorFn } from '@angular/common/http';

// This interceptor automatically attaches the JWT token
// to every HTTP request (so you don't have to do it manually)
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access_token');

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  return next(req);
};
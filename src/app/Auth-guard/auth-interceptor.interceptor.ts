import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SnackbarService } from '../shared/services/snackbar.service';
import { catchError, skip, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ApiResponse } from '../shared/Models/ApiResponse';
import { SpinnerService } from '../shared/services/spinner.service';
import { AuthService } from '../Auth/service/auth.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const snackbarService = inject(SnackbarService);
  const Token = localStorage.getItem('Token');
  const router = inject(Router);
  const spinnerService = inject(SpinnerService);
  const authService = inject(AuthService);
  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${Token}`,
    },
  });

  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      spinnerService.hide();
      const apiUrl = req.url;

      if (error.error && typeof error.error === 'object') {
        const apiError = error.error as ApiResponse<any>;

        if (apiError.isSuccess === false && apiError.statusCode === 204) {
          const errorMessage = 'No Data Found';
          snackbarService.showinfo(errorMessage, 'Error');
        }

        // Check if the error response has the properties we're expecting
        if (
          apiError.statusCode !== undefined &&
          apiError.isSuccess === false &&
          apiError.statusCode !== 204
        ) {
          const errorMessage = 'An unknown error occurred.';
          snackbarService.showerror(errorMessage, 'Error');
          //Send Email to the Admin with Error
          authService
            .sendExpectionMail(apiError.errorMessages, apiUrl)
            .subscribe(() => {
              console.log('Error Sent to Admin');
            });

          // Redirect if unauthorized
          if (apiError.statusCode === 401) {
            router.navigateByUrl('/login');
          }

          return throwError(() => apiError);
        }
        // Handle network errors or connection issues
      }

      // Default network or unknown error handling
      // snackbarService.showerror(
      //   'A network error occurred. Please try again.',
      //   'Network Error'
      // );

      return throwError(() => error);
    })
  );
};

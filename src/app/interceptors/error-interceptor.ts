import { HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
export class ErrorInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        errorMessage = `Error: ${error.error.message}`;
                    }
                    else if (error instanceof HttpErrorResponse && (error as HttpErrorResponse).status === 401) {
                        errorMessage = 'Error : Unauthorized'
                    }
                    else {
                        errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}\n${error.error.message}`;
                    }
                    console.log(errorMessage);
                    alert(errorMessage);
                    return throwError(() => errorMessage);
                }));
    }
}
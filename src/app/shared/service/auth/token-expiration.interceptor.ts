import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class TokenExpirationInterceptor implements HttpInterceptor {
    
    constructor(private authService: AuthService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error) => {
                if (error.status === 401 && error.error && error.error.message === 'Token expired') {
                // Token expired, log out the user
                this.authService.logOut('Your session has expired. Please log in again.');
                }
                throw error;
            })
        );
    }
}

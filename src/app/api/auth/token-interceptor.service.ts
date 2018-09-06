import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { LocalStorageUser } from '../../entities/local-storage-user';
import { tap } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user: LocalStorageUser = this.auth.getUser();

    req.headers.set('Authorization', user.guid);

    return next.handle(req)
      .pipe(
        tap((event: HttpEvent<any>) => {
          console.log('event: ', event);
        }, (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              console.error('Status 401: ', err);
            }
          }
        })
      );
  }
}

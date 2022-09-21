import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const data = localStorage.getItem('data');
    if (data) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${data}`
        }
      });
    }
    return next.handle(request);

  }
}



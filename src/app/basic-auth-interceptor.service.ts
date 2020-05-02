import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './auth.service';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class BasicAuthInterceptorService implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService ,
    private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
        if (this.authenticationService.username && req.url.indexOf('basicauth') === -1) {
         	const authReq = req.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${window.btoa(this.authenticationService.username + ":" + this.authenticationService.password)}`
                })
            });
            return next.handle(authReq);
        } else {
            return next.handle(req).pipe( tap(() => {},
		      (err: any) => {
		      if (err instanceof HttpErrorResponse) {
		        if (err.status !== 401) {
		         return;
		        }		        
		        this.router.navigate(['/login']);
		      }
		    }));
        }
    }
}
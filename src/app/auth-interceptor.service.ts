import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<any>, fwd: HttpHandler){
    console.log(req)
    const cloneReq = req.clone(
      {headers: req.headers.append('Basic','309dnklwe-02330ejwej1-11erg')}
    );
    return fwd.handle(cloneReq).pipe(
      tap(
        event => {
          if(event.type === HttpEventType.Response){
            console.log(event.body);
          }
        }
      )
    );   
  }
  constructor() { }
}

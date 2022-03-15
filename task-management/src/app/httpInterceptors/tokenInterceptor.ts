import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthorizeService } from "../services/authorize.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authorizeService: AuthorizeService){ }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const apiReq = request.clone({ 
            setHeaders: {
                Accept: 'application/json',
                Authorization : 'Bearer ' + this.authorizeService.getToken()
            } 
        });

        return next.handle(apiReq);
    }

}
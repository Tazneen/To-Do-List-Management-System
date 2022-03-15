import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/IUser';
import { IResponse } from '../interfaces/IResponse';
import { Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {

  constructor(private router : Router, private httpClient: HttpClient) { }

  public login(user : IUser) : Observable<IResponse<string>> {
    return this.httpClient.post<IResponse<string>>('api/Account/Login', user)
              .pipe(
                tap(data => {
                  if(data.success){
                    this.setToken(data.result)
                  }
                })
              );
  }

  private setToken(token : string){
    localStorage.setItem('token', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  public isLoggedIn(): boolean{
    let token = this.getToken();
    if(token){
      let jwthelper = new JwtHelperService();
      if(jwthelper.isTokenExpired(token)){
        return false;
      }
      else{
        return true;
      }
    }
    return false;
  }

  public getRoleFromToken(): string | null {
    let token = this.getToken();
    if(token){
      let decodedToken = new JwtHelperService().decodeToken(token);
      let role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  
      return role;
    }
    return null;
  }

  public getUserNameFromToken(): string  | null{
    let token = this.getToken();
    if(token){
      let decodedToken = new JwtHelperService().decodeToken(token);
      let userName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
  
      return userName;
    }
    return null;
  }
}

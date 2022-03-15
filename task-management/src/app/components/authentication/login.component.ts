import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IResponse } from 'src/app/interfaces/IResponse';
import { IUser } from 'src/app/interfaces/IUser';
import { AuthorizeService } from 'src/app/services/authorize.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username: string = "";
  public password: string = "";

  public errorMessage : string = "";

  constructor(private router : Router, private authorize: AuthorizeService) { }

  ngOnInit(): void {
  }

  login(){
    let user = {} as IUser;
    user.userName = this.username;
    user.password = this.password;

    this.authorize.login(user)
      .subscribe(
        data=> {
          if(data.success){
            this.router.navigateByUrl('/home');
          }
          else{
            this.errorMessage = data.message;
          }
        }, 
        error => {
          this.errorMessage = "Error occured in login";
        }
      );
  }

}

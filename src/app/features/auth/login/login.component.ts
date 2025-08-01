import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model:LoginRequest;

  constructor(private authService:AuthService,private cookieService:CookieService,private router:Router){
    this.model={
      email:'',
      password :''
      // initializing the model here in the ctr
    }
  }

  onFormSubmit():void{
    // console.log(this.model);
    this.authService.login(this.model).subscribe({
      next:(res)=>{
        // console.log(res)
        // SEt Auth Cookie 
        this.cookieService.set('Authorization',`Bearer ${res.token}`,undefined,'/',undefined,true,'Strict');

        // set the user in the localStorage 
        this.authService.setUser({
          email:res.email,
          roles:res.roles
        });
        // redirecting user back to the home page 
        this.router.navigateByUrl('/');
      }
    });

  }

}
/*
STORE JWT TOKEN 
Write down the steps of storing the token into the cookie 
1.first install the package using this code : npm i ngx-cookie-service@16.0.0
2.we need to use the set method to cookieService(present in CookieService component from package we installed above),
so inject this CookieService in ctor 
3.since we are going to get the token from the response of the login method, in the subscribe of the login method use cookieService.set to set the cookie 
4.this.cookieService.set('Authorization',`Bearer ${res.token}`,undefined,'/',undefined,true,'Strict');
- we have set the cookie like this way 
5.this name of 'Authorization' is the name of the token here that we have provided, if we need to get this token from this cookie then simply pass this name 'Authorization' in the get method of the cookieService


*/
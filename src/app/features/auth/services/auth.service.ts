import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http:HttpClient,
    private cookieService: CookieService
  ) { }

  // creating a login method this will talk with the LOGIN API and authenticate the user
  login(request :LoginRequest):Observable<LoginResponse>{
    return this.http.post<LoginResponse>('https://localhost:7068/api/auth/login',{
      email:request.email,
      password:request.password
      // this above name should be match with the params of the API
    });
  }

  // creating the setUser 
  setUser(user:User):void{
    this.$user.next(user);
    localStorage.setItem('user-email',user.email);
    localStorage.setItem('user-roles',user.roles.join(','));
  }

  // this service will be subscribed by the nav bar
  user():Observable<User | undefined>{
    return this.$user.asObservable();
    // when there is any change in the user will return this behavior subject of user as a Observable.

  }

  // getUser method to get the user because even if user is logged in and after refeshing the page the navbar shows the login button which it should not, our data of logged in should be persistent throughout the system
  getUser():User|undefined{
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');

    if(email && roles){
      const user:User={
        email : email,
        roles:roles.split(',')
      }
      return user;
    }
    return undefined;
  }
  // get the email and roles of user from the localstorage and create a user variable assign those values to it and return it back

  // logout method 
  logout():void {
    localStorage.clear();
    this.cookieService.delete('Authorization','/');
    this.$user.next(undefined);
    // emitting a observable of undefined to te lOgin and other component which could have subscribed to this observable
  }
}

/*
AUTH SERVICE AND NAVBAR CHANGES: will need to do this one for the Behavior Subject 
IMPLEMENT LOGOUT - NEED TO STUDY THIS ONE ALSO.
*/

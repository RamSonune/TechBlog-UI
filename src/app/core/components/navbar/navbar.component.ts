import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/features/auth/models/user.model';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user?:User

  constructor(private authService:AuthService,private router:Router) {}

  ngOnInit(): void {
    // subscribing to the auth serivce's user serivce 
    this.authService.user().subscribe({
      next:(res)=>{
        // console.log(res)
        // assigning the user from the res to the above user 
        this.user = res;
      }
    });

    this.user=this.authService.getUser();
    // getting the user from the getUser thus when user will be present our login will not appear on the navbar
  }

  onLogout():void{
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

}

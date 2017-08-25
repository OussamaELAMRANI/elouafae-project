import { UsersService } from './../users/users.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class AuthService implements CanActivate {

  constructor(private usersService: UsersService, private router: Router) { }

  canActivate() {
    if(this.usersService.loggedIn()){
      return true
    }
    else {
      this.router.navigate(['/404'])
      return false
    }
  }


}

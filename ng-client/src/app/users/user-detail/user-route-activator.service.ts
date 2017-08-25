import {ActivatedRouteSnapshot, Router} from '@angular/router';
import { UsersService } from '../users.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UserRouteActivator {

  constructor(private sUser:UsersService, private router: Router) { }

  canActivate(route:ActivatedRouteSnapshot){
    const hasUser = !!this.sUser.getUserById(+route.params['id']) //Cated on Number Type

    if(!hasUser){
      this.router.navigate(['/404'])
    }
    return hasUser
  }
}

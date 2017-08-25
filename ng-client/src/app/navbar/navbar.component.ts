import { ToastrService } from './../commun/toastr.service';
import {Router} from '@angular/router';
import { UsersService } from '../users/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dar-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor( private usersService:UsersService,
               private  router:Router,
               private taostr:ToastrService) { }

  ngOnInit() {
  }
  onLogOut() {
    this.usersService.logOut()
    this.taostr.success('Au revoir :)', "Votre Compte est bien fermé ")
    this.router.navigate(['/login'])
    return false
  }
}

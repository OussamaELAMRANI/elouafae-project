import { IUsers } from './../users/Users';
import { Router } from '@angular/router';
import { UsersService } from '../users/users.service';
import { Component, OnInit } from '@angular/core';

import { Observable } from "rxjs/Observable";

@Component({
  selector: 'dar-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any // add _id Field to the Interface
  token: any

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit() {
    this.usersService.getProfile().subscribe(
      data => {
        // console.log(JSON.stringify(data))ta
        this.user = data.user
      },
      err => {
        this.router.navigate(['/404'])
        return false
      }
    )
  }


}

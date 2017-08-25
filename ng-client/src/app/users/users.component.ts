import { Observable } from 'rxjs/Observable'
import { SweetAlertService } from './../commun/sweet-alert.service';
import { Component, OnInit } from '@angular/core'

import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/observable/merge'
import {Subscription} from 'rxjs/Subscription'

import { ISignUp, IUsers } from './Users'
import { UsersService } from "./users.service"

@Component({
  selector: 'dar-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: IUsers

  constructor(private sUser: UsersService,
              private swal: SweetAlertService
              ) { }

  ngOnInit() {
    this.sUser.getUsers()
              .subscribe( //give me each data from Observable Ansync
                (user:IUsers) => {
                  this.users= user
              })
//
  }

  alertBro() {
    this.swal.info('Swaal Alwet TEST', 'Salaaam my SWEET ALERT')
  }
}

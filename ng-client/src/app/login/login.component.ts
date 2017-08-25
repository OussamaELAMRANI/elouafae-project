import { Router } from '@angular/router';
import { UsersService } from './../users/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'


@Component({
  selector: 'dar-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LoginGroup: FormGroup
  msg: any
  constructor(private fBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router) { }

  ngOnInit() {
    this.LoginGroup = this.fBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  login() {
    const user = this.LoginGroup.value
    this.usersService.logIn(user)
      .subscribe(data => {
        if (data.success) {
          this.usersService.storeAuthData(data.token, data.user)
          this.msg = false
          this.router.navigate(['/dashboard'])

        }
        else {
          this.msg = "Erreur d'authentification !!"
          this.router.navigate(['/login'])
        }
        console.log(data)
      });
    }
 };

import { UsersService } from './../users/users.service';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
// import { SignUp } from './SignUp';
import { ISignUp } from "../users/Users";

import 'rxjs/add/operator/map'

function comparePassword(c: AbstractControl) {
  let psswd1 = c.get('password_1')
  let psswd2 = c.get('password_2')
  //if not yet touched, Skeep it
  if (psswd1.pristine || psswd2.pristine) {
    return null
  }
  if (psswd1.value === psswd2.value) {
    return null
  }
  return { match: true }
}

@Component({
  selector: 'dar-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  isDirty: boolean = false
  message:any
  signUpGroup: FormGroup; //associated with form element
  title = "Demande De Re-joindre Au Groupe De Travail"

  constructor(private router: Router,
              private fBuilder: FormBuilder,
              private http:Http,
              private usersService:UsersService) { }


  ngOnInit() {
    // intial Forms
    this.signUpGroup = this.fBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: this.fBuilder.group({
        password_1: ['', [Validators.required]],
        password_2: ['', [Validators.required]]
      }, { validator: comparePassword })
    })


  }

  cancel() {
    this.router.navigate(['/login'])
  }

  save() {
    const signUp: ISignUp ={
      firstName: this.signUpGroup.get('firstName').value,
      lastName: this.signUpGroup.get('lastName').value,
      username: this.signUpGroup.get('username').value,
      password: this.signUpGroup.get('password.password_1').value,
    }
    // console.log(signUp)
    this.usersService.signUpUser(signUp).subscribe(data => {
      this.message = data
    })
    //redirect To Login Page
    this.router.navigate(['/usr'])
  }



  testData() {
    this.signUpGroup.setValue({
      firstName: 'Oussama',
      lastName: 'ELAMRANI',
      username: 'oussama.el',
      password: '123',
      password_2: '123',
    })
  }


}

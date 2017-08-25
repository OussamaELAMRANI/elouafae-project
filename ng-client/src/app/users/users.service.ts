import { Headers, Response, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { tokenNotExpired, AuthConfigConsts } from 'angular2-jwt'
import { Subject } from 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";

import { IUsers, ISignUp, ILogIn } from './Users'

@Injectable()
export class UsersService {
  // AuthConfigConsts.HEADER_PREFIX_BEARER= "JWT";
  //data form the server
  authToken: any
  userInfo: any
  // ==== Info from the LogIn
  private basePath = "users"

  constructor(private http: Http) { }

  storeAuthData(token, user) {
    localStorage.setItem('id_token', token)
    localStorage.setItem('user', JSON.stringify(user))
    this.authToken = token
    this.userInfo = user

  }

  logIn(logIn: Observable<ILogIn>): Observable<any> {
    let url = `${this.basePath}/login`
    let header = new Headers()
    header.append('Content-Type', 'application/json')
    return this.http.post(url, logIn, { headers: header })
      .map(this.extractData)
  }
  logOut() {
    this.authToken = null
    this.userInfo = null
    localStorage.clear()
  }
  loggedIn() {
    this.loadToken()
    return tokenNotExpired('jwt', this.authToken)
  }
  getProfile() {
    let url = `${this.basePath}/profile`
    let header = new Headers()
    this.loadToken()
    header.append('Authorization', this.authToken)
    header.append('Content-Type', 'application/json')

    return this.http.get(url, { headers: header })
      .map(this.extractData)
  }

  loadToken() {
    const token = localStorage.getItem('id_token')
    this.authToken = token
  }

  getUsers(): Observable<IUsers> {
    return this.http.get(this.basePath)
      .map(this.extractData)
      .do(data => console.log('(DO/CATCH) get users: ' + JSON.stringify(data)));
    // .catch(this.errorHandler);
  }


  getUserById(id: number): Observable<IUsers> {
    let url = `${this.basePath}`
    return this.http.get(url).map(this.extractData)
  }

  deleteUser(id: number) { //Observable<IUsers>
  }

  saveNewUser() {
  }

  signUpUser(newUser: ISignUp) {
    let url = `${this.basePath}/sign-up`
    console.log(url);
    let header = new Headers()
    header.append('Content-Type', 'application/json')
    // console.log(JSON.stringify(this.signUpGroup.value))
    return this.http.post(url, newUser, { headers: header })
      .map(this.extractData)
  }

  private extractData(res: Response) {
    let body = res.json()
    return body || {}
  }

  private errorHandler(err) {
    return err
  }
}

// const USERS: any[] = [
//   {
//     id: 1,
//     firstName: 'Oussama',
//     lastName: 'el amrani',
//     username: 'oussama.elamrani',
//     password: '*********',
//     active: false,
//     group: ['noOne'],
//     createdAt: Date.now(),
//     updatedAt: 'nn'
//   },
//   {
//     id: 3,
//     firstName: 'Salim',
//     lastName: 'mrich',
//     username: 'mriche.salim',
//     password: '*********',
//     active: false,
//     group: ['noOne'],
//     createdAt: Date.now(),
//     updatedAt: 'nn'
//   },
//   {
//     id: 12,
//     firstName: 'Fatiha',
//     lastName: 'el alaoui',
//     username: 'karima.el',
//     password: 'op dhgd',
//     active: false,
//     group: ['noOne'],
//     createdAt: Date.now(),
//     updatedAt: ''
//   }
// ]

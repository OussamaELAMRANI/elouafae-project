import {ActivatedRoute} from '@angular/router';
import { UsersService } from '../users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dar-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  usr:any

  constructor(private sUser:UsersService, private aRoute:ActivatedRoute) { }

  ngOnInit() {
    this.usr = this.sUser.getUserById(+this.aRoute.snapshot.params['id'])
  }

}

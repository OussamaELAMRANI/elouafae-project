import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersComponent } from './users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

import { UsersService } from './users.service';
import { userRoutes } from './routes';
import { UsersListComponent } from './users-list/users-list.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes)
  ],
  declarations: [
    UsersComponent,
    UserDetailComponent,
    UsersListComponent
  ],
  providers: [
    UsersService
  ]
})
export class UsersModule { }


// function isDirty(component: SignUpComponent) {

// }

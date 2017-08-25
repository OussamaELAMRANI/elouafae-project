import { UsersListComponent } from './users-list/users-list.component';
import { UserRouteActivator } from 'app/users/user-detail/user-route-activator.service';
import { Routes } from '@angular/router';

import { UsersComponent } from 'app/users/users.component';
// import { SigninComponent } from './signin/signin.component';
import { UserDetailComponent } from 'app/users/user-detail/user-detail.component';


export const userRoutes: Routes = [

  { path: '', component: UsersComponent },
  { path: 'detail/:id', component: UserDetailComponent, canActivate:[UserRouteActivator] },
  { path: 'users-list', component: UsersListComponent }

]

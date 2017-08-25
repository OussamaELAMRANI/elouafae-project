import { EditInventoryComponent } from './inventories/edit-inventory/edit-inventory.component';
import { NewInventoryComponent } from './inventories/new-inventory/new-inventory.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { _404Component } from './error/404/404.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoriesComponent } from './inventories/inventories.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from "app/sign-up/sign-up.component";
import { ProfileComponent } from "app/profile/profile.component";
import { ListInventoriesComponent } from "app/inventories/list-inventories/list-inventories.component";

import { AuthService } from "app/gurads/auth.service";
import { CanDeactiveRouteService } from './sign-up/can-deactive-route.service';

import { userRoutes } from './users/routes'

const routes: Routes = [
  {
    path: 'usr',
    children: userRoutes
  },
  { path: 'inventory', component: InventoriesComponent },
  { path: 'inventory/new', component: NewInventoryComponent },
  { path: 'inventory/:id', component: ListInventoriesComponent },
  { path: 'edit-inventory/:id', component: EditInventoryComponent },

  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent, canDeactivate: [CanDeactiveRouteService] },
  { path: 'dashboard', component: DashboardComponent,canActivate:[AuthService] }, // canActivate:[AuthService]
  { path: 'profile', component: ProfileComponent, canActivate:[AuthService]  }, //canActivate:[AuthService]
  { path: '404', component: _404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

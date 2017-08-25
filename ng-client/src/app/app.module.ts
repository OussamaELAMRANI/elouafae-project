import { SemanticUiService } from './commun/semantic-ui.service';
import { AccordionUiService } from './commun/accordion-ui.service';
import { CalendarUiService } from './commun/calendar-ui.service';
import { InventoryService } from 'app/inventories/inventory.service';
import { CanDeactiveRouteService } from './sign-up/can-deactive-route.service';
// import { SigninComponent } from './users/signin/signin.component';
import { ToastrService } from './commun/toastr.service';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MyDatePickerModule } from 'mydatepicker';



import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { _404Component } from './error/404/404.component'
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';

import { InventoriesComponent } from './inventories/inventories.component';
import { ListInventoriesComponent } from './inventories/list-inventories/list-inventories.component';
import { ListDetailsComponent } from './inventories/list-details/list-details.component';
import { NewInventoryComponent } from './inventories/new-inventory/new-inventory.component'

import { UsersModule } from "./users/users.module";
import { AppRoutingModule } from "./app.routing.module";

import { SweetAlertService } from './commun/sweet-alert.service';
import { UserRouteActivator } from './users/user-detail/user-route-activator.service';
import { AuthService } from './gurads/auth.service';

import { FileDropDirective, FileSelectDirective } from 'ng2-file-upload';
import { EditInventoryComponent } from './inventories/edit-inventory/edit-inventory.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    _404Component,
    SignUpComponent,
    ProfileComponent,
    InventoriesComponent,
    ListInventoriesComponent,
    ListDetailsComponent,
    NewInventoryComponent,
    FileDropDirective,
    FileSelectDirective,
    EditInventoryComponent
  ],
  imports: [
    BrowserModule,
    MyDatePickerModule,
    UsersModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    SweetAlertService,
    ToastrService,
    UserRouteActivator,
    AuthService,
    CanDeactiveRouteService,
    InventoryService,
    CalendarUiService,
    AccordionUiService,
    SemanticUiService
    // {
    //   provide: CanDeactiveRouteService,
    //   useValue: isDirty
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



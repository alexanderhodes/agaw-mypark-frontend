import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './components/users/users.component';
import { ParkingspacesAdminComponent } from './components/parkingspaces-admin/parkingspaces-admin.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProblemsComponent } from './components/problems/problems.component';



@NgModule({
  declarations: [
    UsersComponent,
    ParkingspacesAdminComponent,
    ProblemsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    UsersComponent,
    ParkingspacesAdminComponent,
    ProblemsComponent
  ],
  providers: [

  ]
})
export class AdminModule { }

import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './components/users/users.component';
import { ParkingspacesAdminComponent } from './components/parkingspaces-admin/parkingspaces-admin.component';



@NgModule({
  declarations: [
    UsersComponent,
    ParkingspacesAdminComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    UsersComponent,
    ParkingspacesAdminComponent
  ],
  providers: [

  ]
})
export class AdminModule { }

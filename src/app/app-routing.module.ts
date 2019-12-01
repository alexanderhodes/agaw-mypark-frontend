import { ParkingspacesAdminComponent } from './admin/components/parkingspaces-admin/parkingspaces-admin.component';
import { UsersComponent } from './admin/components/users/users.component';
import { BookingsComponent } from './shared/components/bookings/bookings.component';
import { RegistrationComponent } from './shared/components/registration/registration.component';
import { ResetPasswordComponent } from './shared/components/reset-password/reset-password.component';
import { LoginComponent } from './shared/components/login/login.component';
import { ParkingSpacesListComponent } from './parking-spaces/parking-spaces-list/parking-spaces-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'parkingspaces', component: ParkingSpacesListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: 'admin',
    children: [
      { path: 'parkingspaces', component: ParkingspacesAdminComponent },
      { path: 'users', component: UsersComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

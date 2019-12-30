import { PasswordComponent } from './shared/components/common/password/password.component';
import { AdminGuard } from './components/guards/admin.guard';
import { UnauthGuard } from './components/guards/unauth.guard';
import { ParkingspacesAdminComponent } from './admin/components/parkingspaces-admin/parkingspaces-admin.component';
import { UsersComponent } from './admin/components/users/users.component';
import { BookingsComponent } from './shared/components/bookings/bookings.component';
import { RegistrationComponent } from './shared/components/registration/registration.component';
import { ResetPasswordComponent } from './shared/components/reset-password/reset-password.component';
import { LoginComponent } from './shared/components/login/login.component';
import { ParkingSpacesListComponent } from './parking-spaces/parking-spaces-list/parking-spaces-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './components/guards/auth.guard';


const routes: Routes = [
  { path: '',
    component: LoginComponent,
    canActivate: [ UnauthGuard ] },
  { path: 'parkingspaces',
    component: ParkingSpacesListComponent,
    canActivate: [ AuthGuard ] },
  { path: 'login',
    component: LoginComponent,
    canActivate: [ UnauthGuard ] },
  { path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [ UnauthGuard ] },
  { path: 'registration',
    component: RegistrationComponent,
    canActivate: [ UnauthGuard ] },
  { path: 'bookings',
    component: BookingsComponent,
    canActivate: [ AuthGuard ] },
  { path: 'admin',
    canActivate: [ AdminGuard ],
    children: [
      { path: 'parkingspaces', component: ParkingspacesAdminComponent },
      { path: 'users', component: UsersComponent },
    ] },
  { path: 'common/password/:token',
    canActivate: [ UnauthGuard ],
    component: PasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

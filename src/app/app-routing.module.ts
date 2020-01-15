import {PasswordComponent} from './unauth/components/password/password.component';
import {AdminGuard} from './shared/guards/admin.guard';
import {UnauthGuard} from './shared/guards/unauth.guard';
import {BookingsComponent} from './parking-spaces/components/bookings/bookings.component';
import {RegistrationComponent} from './unauth/components/registration/registration.component';
import {ResetPasswordComponent} from './unauth/components/reset-password/reset-password.component';
import {LoginComponent} from './unauth/components/login/login.component';
import {ParkingSpacesListComponent} from './parking-spaces/components/parking-spaces-list/parking-spaces-list.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './shared/guards/auth.guard';
import {NewBookingComponent} from './parking-spaces/components/new-booking/new-booking.component';
import {SeriesBookingComponent} from './parking-spaces/components/series-booking/series-booking.component';
import {PersonalDataComponent} from './parking-spaces/components/personal-data/personal-data.component';
import {SeriesAbsenceComponent} from './parking-spaces/components/series-absence/series-absence.component';
import {NewAbsenceComponent} from './parking-spaces/components/new-absence/new-absence.component';
import {AbsenceListComponent} from './parking-spaces/components/absence-list/absence-list.component';
import {ConfirmRegisterComponent} from './unauth/components/confirm-register/confirm-register.component';
import {ChangePasswordComponent} from './parking-spaces/components/change-password/change-password.component';


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
  { path: 'new-booking',
    component: NewBookingComponent,
    canActivate: [ AuthGuard ] },
  { path: 'series-booking',
    component: SeriesBookingComponent,
    canActivate: [ AuthGuard ] },
  { path: 'absences',
    component: AbsenceListComponent,
    canActivate: [ AuthGuard ] },
  { path: 'new-absence',
    component: NewAbsenceComponent,
    canActivate: [ AuthGuard ] },
  { path: 'series-absence',
    component: SeriesAbsenceComponent,
    canActivate: [ AuthGuard ] },
  { path: 'personal-data',
    component: PersonalDataComponent,
    canActivate: [ AuthGuard ] },
  { path: 'admin',
    canActivate: [ AdminGuard ],
    loadChildren: () => import(`./admin/admin.module`).then(a => a.AdminModule) },
  { path: 'common/password/:token',
    canActivate: [ UnauthGuard ],
    component: PasswordComponent
  },
  {
    path: 'common/confirm-registration/:token',
    canActivate: [UnauthGuard],
    component: ConfirmRegisterComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

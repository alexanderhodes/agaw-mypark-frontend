import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ParkingspacesAdminComponent} from './components/parkingspaces-admin/parkingspaces-admin.component';
import {UsersComponent} from './components/users/users.component';
import {ProblemsComponent} from './components/problems/problems.component';
import {AuthGuard} from '../shared/guards/auth.guard';

const routes: Routes = [
  {path: '', component: ParkingspacesAdminComponent, canActivate: [AuthGuard]},
  {path: 'parkingspaces', component: ParkingspacesAdminComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'problems', component: ProblemsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ParkingspacesAdminComponent} from './components/parkingspaces-admin/parkingspaces-admin.component';
import {UsersComponent} from './components/users/users.component';
import {ProblemsComponent} from './components/problems/problems.component';

const routes: Routes = [
  { path: '', component: ParkingspacesAdminComponent },
  { path: 'parkingspaces', component: ParkingspacesAdminComponent },
  { path: 'users', component: UsersComponent },
  { path: 'problems', component: ProblemsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}

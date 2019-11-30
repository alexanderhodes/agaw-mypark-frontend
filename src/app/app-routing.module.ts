import { LoginComponent } from './shared/components/login/login.component';
import { ParkingSpacesListComponent } from './parking-spaces/parking-spaces-list/parking-spaces-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'parkingspaces', component: ParkingSpacesListComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent, ResetPasswordComponent, RegistrationComponent, PasswordComponent} from './components/public_api';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ResetPasswordComponent,
    PasswordComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    LoginComponent,
    RegistrationComponent,
    ResetPasswordComponent,
    PasswordComponent
  ]
})
export class UnauthModule { }

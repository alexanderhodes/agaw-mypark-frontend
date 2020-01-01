import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiService, MyparkApiService, AuthService, ApiErrorHandler, LocalStorageService, ModalService }
          from './services/public_api';
import { ButtonComponent, HeaderComponent, NavigationComponent, NavigationItemComponent, LoginComponent,
          FooterComponent, ResetPasswordComponent, RegistrationComponent, InfoIconComponent, BookingsComponent ,
          PasswordComponent, ErrorMessageComponent, ConfirmationComponent } from './components/public_api';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ButtonComponent,
    HeaderComponent,
    NavigationComponent,
    NavigationItemComponent,
    LoginComponent,
    FooterComponent,
    ResetPasswordComponent,
    RegistrationComponent,
    InfoIconComponent,
    BookingsComponent,
    PasswordComponent,
    ErrorMessageComponent,
    ConfirmationComponent,
  ],
  exports: [
    ButtonComponent,
    HeaderComponent,
    NavigationComponent,
    NavigationItemComponent,
    LoginComponent,
    FooterComponent,
    ResetPasswordComponent,
    RegistrationComponent,
    InfoIconComponent,
    BookingsComponent,
    PasswordComponent,
    ErrorMessageComponent,
    ConfirmationComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ ApiService, MyparkApiService, AuthService, LocalStorageService, ApiErrorHandler, ModalService ]
    };
  }
}

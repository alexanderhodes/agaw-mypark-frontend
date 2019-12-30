import { ApiErrorHandler } from './services/api/api-error-handler';
import { MyparkApiService } from './services/api/mypark-api.service';
import { ApiService } from './services/api/api.service';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ButtonComponent } from './components/button/button.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NavigationItemComponent } from './components/navigation/navigation-item/navigation-item.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { InfoIconComponent } from './components/info-icon/info-icon.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { LocalStorageService } from './services/local-storage.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PasswordComponent } from './components/common/password/password.component';

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
    PasswordComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ ApiService, MyparkApiService, AuthService, LocalStorageService, ApiErrorHandler
       ]
    };
  }
}

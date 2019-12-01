import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { NgModule } from '@angular/core';
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


@NgModule({
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
    BookingsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule,
    RouterModule
  ],
  exports: [
    ButtonComponent,
    HeaderComponent,
    NavigationComponent,
    LoginComponent,
    FooterComponent,
    ResetPasswordComponent,
    BookingsComponent
  ],
  providers: [
    AuthService
  ]
})
export class SharedModule { }

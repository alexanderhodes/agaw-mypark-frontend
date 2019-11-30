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


@NgModule({
  declarations: [ButtonComponent, HeaderComponent, NavigationComponent, NavigationItemComponent, LoginComponent, FooterComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule
  ],
  exports: [
    ButtonComponent,
    HeaderComponent,
    NavigationComponent,
    LoginComponent,
    FooterComponent
  ],
  providers: [
    AuthService
  ]
})
export class SharedModule { }

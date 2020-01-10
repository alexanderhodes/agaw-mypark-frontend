import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiService, MyparkApiService, AuthService, ApiErrorHandler, LocalStorageService, ModalService, DateService
          } from './services/public_api';
import { ButtonComponent, HeaderComponent, NavigationComponent, NavigationItemComponent, FooterComponent, InfoIconComponent,
          PasswordComponent, ErrorMessageComponent, ConfirmationComponent, LoadingSpinnerComponent } from './components/public_api';
import { StatusTranslationPipe } from './pipes/public_api';

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
    FooterComponent,
    InfoIconComponent,
    PasswordComponent,
    ErrorMessageComponent,
    ConfirmationComponent,
    StatusTranslationPipe,
    LoadingSpinnerComponent,
  ],
  exports: [
    ButtonComponent,
    HeaderComponent,
    NavigationComponent,
    NavigationItemComponent,
    FooterComponent,
    InfoIconComponent,
    PasswordComponent,
    ErrorMessageComponent,
    ConfirmationComponent,
    StatusTranslationPipe,
    LoadingSpinnerComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ ApiService, MyparkApiService, AuthService, LocalStorageService, ApiErrorHandler, ModalService,
        DateService ]
    };
  }
}

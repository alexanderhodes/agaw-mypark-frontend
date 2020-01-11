import {RouterModule} from '@angular/router';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  AbsenceService,
  ApiErrorHandler,
  ApiService,
  AuthService,
  BookingService,
  CommonService,
  DateService,
  LocalStorageService,
  ModalService,
  ParkingSpaceService,
  ProblemService,
  SeriesBookingService,
  UserService
} from './services/public_api';
import {
  ButtonComponent,
  ConfirmationComponent,
  ErrorMessageComponent,
  FooterComponent,
  HeaderComponent,
  InfoIconComponent,
  LoadingSpinnerComponent,
  NavigationComponent,
  NavigationItemComponent
} from './components/public_api';
import {StatusTranslationPipe} from './pipes/public_api';

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
    ErrorMessageComponent,
    ConfirmationComponent,
    StatusTranslationPipe,
    LoadingSpinnerComponent,
    ErrorDirective
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ ApiService, AuthService, LocalStorageService, ApiErrorHandler, ModalService, DateService, AbsenceService,
        BookingService, CommonService, ParkingSpaceService, ProblemService, SeriesBookingService, UserService ]
    };
  }
}

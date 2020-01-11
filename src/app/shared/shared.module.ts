import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiService, AuthService, LocalStorageService, ApiErrorHandler, ModalService, DateService, AbsenceService, BookingService,
          CommonService, ParkingSpaceService, ProblemService, SeriesBookingService, UserService } from './services/public_api';
import { ButtonComponent, HeaderComponent, NavigationComponent, NavigationItemComponent, FooterComponent, InfoIconComponent,
          ErrorMessageComponent, ConfirmationComponent, LoadingSpinnerComponent } from './components/public_api';
import { StatusTranslationPipe } from './pipes/public_api';
import { ErrorDirective } from './directives/error.directive';

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
    ErrorDirective,
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

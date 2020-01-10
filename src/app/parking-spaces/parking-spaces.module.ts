import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ParkingSpacesListComponent } from './components/parking-spaces-list/parking-spaces-list.component';
import { SharedModule } from '../shared/shared.module';
import { NewBookingComponent } from './components/new-booking/new-booking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeriesBookingComponent } from './components/series-booking/series-booking.component';
import { SeriesItemComponent } from './components/series-item/series-item.component';
import { PersonalDataComponent } from './components/personal-data/personal-data.component';
import { NewAbsenceComponent } from './components/new-absence/new-absence.component';
import { SeriesAbsenceComponent } from './components/series-absence/series-absence.component';
import { AbsenceListComponent } from './components/absence-list/absence-list.component';
import {BookingsComponent} from './components/bookings/bookings.component';

@NgModule({
    declarations: [ParkingSpacesListComponent, NewBookingComponent, SeriesBookingComponent, SeriesItemComponent,
      PersonalDataComponent, NewAbsenceComponent, SeriesAbsenceComponent, AbsenceListComponent, BookingsComponent ],
    imports: [ CommonModule, SharedModule, FormsModule, ReactiveFormsModule ],
    exports: [ ParkingSpacesListComponent, NewBookingComponent, SeriesBookingComponent, PersonalDataComponent,
      NewAbsenceComponent, SeriesAbsenceComponent, AbsenceListComponent, BookingsComponent ]
})
export class ParkingSpaceModule {

}

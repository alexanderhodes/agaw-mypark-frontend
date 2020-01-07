import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ParkingSpacesListComponent } from './parking-spaces-list/parking-spaces-list.component';
import { SharedModule } from '../shared/shared.module';
import { NewBookingComponent } from './new-booking/new-booking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeriesBookingComponent } from './series-booking/series-booking.component';
import { SeriesItemComponent } from './series-item/series-item.component';
import { PersonalDataComponent } from './personal-data/personal-data.component';
import { NewAbsenceComponent } from './new-absence/new-absence.component';
import { SeriesAbsenceComponent } from './series-absence/series-absence.component';
import { AbsenceListComponent } from './absence-list/absence-list.component';

@NgModule({
    declarations: [ParkingSpacesListComponent, NewBookingComponent, SeriesBookingComponent, SeriesItemComponent,
      PersonalDataComponent, NewAbsenceComponent, SeriesAbsenceComponent, AbsenceListComponent ],
    imports: [ CommonModule, SharedModule, FormsModule, ReactiveFormsModule ],
    exports: [ ParkingSpacesListComponent, NewBookingComponent, SeriesBookingComponent, PersonalDataComponent,
      NewAbsenceComponent, SeriesAbsenceComponent, AbsenceListComponent ]
})
export class ParkingSpaceModule {

}

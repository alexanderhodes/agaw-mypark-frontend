import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ParkingSpacesListComponent } from './parking-spaces-list/parking-spaces-list.component';
import { SharedModule } from '../shared/shared.module';
import { NewBookingComponent } from './new-booking/new-booking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SeriesBookingComponent } from './series-booking/series-booking.component';
import { SeriesBookingItemComponent } from './series-booking/series-booking-item/series-booking-item.component';

@NgModule({
    declarations: [ParkingSpacesListComponent, NewBookingComponent, SeriesBookingComponent, SeriesBookingItemComponent],
    imports: [ CommonModule, SharedModule, FormsModule, ReactiveFormsModule ],
    exports: [ ParkingSpacesListComponent, NewBookingComponent, SeriesBookingComponent ]
})
export class ParkingSpaceModule {

}

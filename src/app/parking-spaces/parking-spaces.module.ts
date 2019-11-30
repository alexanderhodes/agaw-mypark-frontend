import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ParkingSpacesListComponent } from './parking-spaces-list/parking-spaces-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [ParkingSpacesListComponent],
    imports: [ CommonModule, SharedModule ],
    exports: [ParkingSpacesListComponent]
})
export class ParkingSpaceModule {

}

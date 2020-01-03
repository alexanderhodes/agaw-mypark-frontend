import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SeriesBooking} from '../../../shared/models/mypark.models';

@Component({
  selector: 'mp-series-booking-item',
  templateUrl: './series-booking-item.component.html',
  styleUrls: ['./series-booking-item.component.scss']
})
export class SeriesBookingItemComponent implements OnInit {

  @Input()
  item: SeriesBooking;
  @Input()
  weekDay: string;

  @Output()
  changed: EventEmitter<SeriesBooking>;

  constructor() {
    this.changed = new EventEmitter<SeriesBooking>();
  }

  ngOnInit() {
  }

  toggle(): void {
    this.item.active = !this.item.active;
    this.changed.emit(this.item);
  }

  inputChange(): void {
    this.changed.emit(this.item);
  }

}

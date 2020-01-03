import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SeriesBookingItem} from '../series-booking.component';

@Component({
  selector: 'mp-series-booking-item',
  templateUrl: './series-booking-item.component.html',
  styleUrls: ['./series-booking-item.component.scss']
})
export class SeriesBookingItemComponent implements OnInit {

  @Input()
  item: SeriesBookingItem;

  @Output()
  changed: EventEmitter<SeriesBookingItem>;

  constructor() {
    this.changed = new EventEmitter<SeriesBookingItem>();
  }

  ngOnInit() {
  }

  toggle(): void {
    this.item.checked = !this.item.checked
    this.changed.emit(this.item);
  }

  inputChange(): void {
    this.changed.emit(this.item);
  }

}

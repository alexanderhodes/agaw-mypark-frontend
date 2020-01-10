import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SeriesAbsence, SeriesBooking} from '../../../shared/models/mypark.models';

@Component({
  selector: 'mp-series-item',
  templateUrl: './series-item.component.html',
  styleUrls: ['./series-item.component.scss']
})
export class SeriesItemComponent implements OnInit {

  @Input()
  item: SeriesBooking | SeriesAbsence;
  @Input()
  weekDay: string;
  @Input()
  displayTime: boolean;

  @Output()
  changed: EventEmitter<SeriesBooking | SeriesAbsence>;

  constructor() {
    this.changed = new EventEmitter<SeriesBooking | SeriesAbsence>();
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

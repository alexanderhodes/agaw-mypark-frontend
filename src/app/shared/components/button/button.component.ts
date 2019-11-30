import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mp-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  private _title: string;
  private _icon: string;

  constructor() { }

  ngOnInit() {
  }

  get icon(): string {
    return this._icon;
  }

  @Input()
  set icon(value: string) {
    this._icon = value;
  }

  get title(): string {
    return this._title;
  }

  @Input()
  set title(value: string) {
    this._title = value;
  }


}

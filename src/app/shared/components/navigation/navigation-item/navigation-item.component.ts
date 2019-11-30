import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mp-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss']
})
export class NavigationItemComponent implements OnInit {

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

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mp-info-icon',
  templateUrl: './info-icon.component.html',
  styleUrls: ['./info-icon.component.scss']
})
export class InfoIconComponent implements OnInit {

  private _text: string;

  constructor() { }

  ngOnInit() {
  }

  @Input()
  set text(value: string) {
    this._text = value;
  }

  title(): string {
    return `title: ${this._text} ; pos: left;`;
  }

}

import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import * as uikit from 'uikit';

@Component({
  selector: 'mp-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  private _text: string;
  private _title: string;
  private _emitClick: EventEmitter<any>;
  private _id: string;
  private _closeText: string;

  constructor() {
    this._emitClick = new EventEmitter<any>();
    this._closeText = 'Fenster schließen';
  }

  ngOnInit() {
  }

  @Input()
  set id(value: string) {
    this._id = value;
  }

  @Input()
  set title(value: string) {
    this._title = value;
  }

  @Input()
  set text(value: string) {
    this._text = value;
  }

  @Input()
  set closeText(value: string) {
    this._closeText = value;
  }

  @Input()
  set emitClick(value: EventEmitter<any>) {
    this._emitClick = value;
  }

  get text(): string {
    return this._text;
  }

  get title(): string {
    return this._title;
  }

  get emitClick(): EventEmitter<any> {
    return this._emitClick;
  }

  get id(): string {
    return this._id;
  }

  get closeText(): string {
    return this._closeText;
  }

  public closeModal(): void {
    uikit.modal(`#${this._id}`).hide();
  }

}

import { Component, OnInit, Input } from '@angular/core';
import {Message} from '../../models/component.models';

@Component({
  selector: '[mp-error-message]',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {

  private _message: Message;

  constructor() { }

  ngOnInit() {
  }

  get message(): Message {
    return this._message;
  }

  @Input()
  set message(value: Message) {
    this._message = value;
  }
}

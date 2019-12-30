import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[mp-error-message]',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {

  private _success: boolean;
  private _message: string;

  constructor() { }

  ngOnInit() {
  }

  @Input()
  set success(value: boolean) {
    this._success = value;
  }

  @Input()
  set message(value: string) {
    this._message = value;
  }

  get success(): boolean {
    return this._success;
  }

  get message(): string {
    return this._message;
  }

}

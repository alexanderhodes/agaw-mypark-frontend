import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalService} from '../../../services/common/modal.service';
import {ModalConfiguration} from '../../../models/component.models';

@Component({
  selector: 'mp-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  private _text: string;
  private _title: string;
  private _id: string;
  private _closeText: string;
  private _configuration: ModalConfiguration;

  @Output()
  onConfirm: EventEmitter<any>;


  constructor(private modalService: ModalService) {
    this.onConfirm = new EventEmitter<any>();
    this._closeText = 'schließen';
  }

  ngOnInit() {
  }

  @Input()
  set configuration(value: ModalConfiguration) {
    this._configuration = value;
    if (this._configuration) {
      this._id = this._configuration.id;
      this._title = this._configuration.title;
      this._text = this._configuration.text;
      this._closeText = this._configuration.closeText;
    }
  }

  get text(): string {
    return this._text;
  }

  get title(): string {
    return this._title;
  }

  get id(): string {
    return this._id;
  }

  get closeText(): string {
    return this._closeText;
  }

  public confirm(text: string) {
    this.closeModal();
    this.onConfirm.emit(text);
  }

  public closeModal(): void {
    this.modalService.hide(this.id);
  }

}

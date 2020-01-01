import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalService} from '../../../services/common/modal.service';

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

  @Output()
  onConfirm: EventEmitter<any>;


  constructor(private modalService: ModalService) {
    this.onConfirm = new EventEmitter<any>();
    this._closeText = 'schließen';
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

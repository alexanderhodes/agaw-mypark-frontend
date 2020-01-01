import { Injectable } from '@angular/core';
import * as uikit from 'uikit';

@Injectable()
export class ModalService {

  private timeout: number;

  constructor() {
    this.timeout = 100;
  }

  public show(id: string): void {
    setTimeout(() => {
      uikit.modal(`#${id}`).show();
    }, this.timeout);
  }

  public hide(id: string): void {
    setTimeout(() => {
      uikit.modal(`#${id}`).hide(id);
    }, this.timeout);
  }

}

import { Injectable } from '@angular/core';
import * as uikit from 'uikit';

@Injectable()
export class ModalService {

  constructor() {}

  public show(id: string): void {
    uikit.modal(`#${id}`).show();
  }

  public hide(id: string): void {
    uikit.modal(`#${id}`).hide(id);
  }

}

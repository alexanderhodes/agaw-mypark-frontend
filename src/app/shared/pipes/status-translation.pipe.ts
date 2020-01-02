import { Pipe, PipeTransform } from '@angular/core';

const translations = {
  occupied: 'freigegeben',
  confirmed: 'bestätigt',
  requested: 'angefragt',
  declined: 'abgelegt',
  free: 'frei',
  used: 'belegt'
};

@Pipe({
  name: 'statusTranslation'
})
export class StatusTranslationPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return translations[value] ? translations[value] : value;
  }

}

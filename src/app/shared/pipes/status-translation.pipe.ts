import { Pipe, PipeTransform } from '@angular/core';

const translations = {
  occupied: 'freigegeben',
  confirmed: 'bestätigt',
  requested: 'angefragt',
  declined: 'abgelegt',
  free: 'frei',
  used: 'belegt',
  'status free is used': 'Parkplatz ist frei wird jedoch verwendet',
  'status used is free': 'Parkplatz ist belegt wird jedoch nicht verwendet'
};

@Pipe({
  name: 'statusTranslation'
})
export class StatusTranslationPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return translations[value] ? translations[value] : value;
  }

}

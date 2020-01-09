
export class DateService {

  constructor() {}

  public getToday(): string {
    const date = new Date();
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  }

  public formatToGerman(date: Date): string {
    console.log(date);
    return Intl.DateTimeFormat('de-de').format(date);
  }

}

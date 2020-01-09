
export class DateService {

  constructor() {}

  public getToday(): string {
    const date = new Date();
    const formatted = this.formatDateToGerman(date);
    return formatted;
  }

  public formatToGerman(date: Date): string {
    console.log(date);
    return Intl.DateTimeFormat('de-de').format(date);
  }

  public formatToGermanDate(date: any): string {
    const d = date.substr(8, 2);
    const m = date.substr(5, 2);
    const y = date.substr(0, 4);
    return `${d}.${m}.${y}`;
  }

  private formatDateToGerman(date: Date): string {
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  }
}

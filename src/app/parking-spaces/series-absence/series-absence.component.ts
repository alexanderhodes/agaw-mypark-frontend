import { Component, OnInit } from '@angular/core';
import {SeriesAbsence, SeriesBooking} from '../../shared/models/mypark.models';
import {MyparkApiService} from '../../shared/services/api/mypark-api.service';
import {Message} from '../../shared/models/component.models';

@Component({
  selector: 'mp-series-absence',
  templateUrl: './series-absence.component.html',
  styleUrls: ['./series-absence.component.scss']
})
export class SeriesAbsenceComponent implements OnInit {

  public seriesAbsences: SeriesAbsence[];
  public weekdays: string[];
  public message: Message;
  public isLoading: boolean;

  private isInitial: boolean;

  constructor(private apiService: MyparkApiService) {
    this.seriesAbsences = [];
    this.weekdays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];
    this.isInitial = false;
    this.isLoading = false;
  }

  ngOnInit() {
    this.isLoading = true;
    // init array
    this.apiService.getSeriesAbsences().subscribe((seriesAbsences: SeriesAbsence[]) => {
      if (!seriesAbsences || seriesAbsences.length === 0) {
        for (let i = 1; i <= 5; i++) {
          this.seriesAbsences.push({ id: null, weekday: i, active: false, user: null });
        }
        this.isInitial = true;
      } else {
        this.seriesAbsences = seriesAbsences.sort((a: SeriesAbsence, b: SeriesAbsence) => {
          return a.weekday - b.weekday;
        });
        this.isInitial = false;
      }
      this.isLoading = false;
    });
  }

  public saveAbsences(): void {
    this.isLoading = true;
    // implement this!!
    if (this.isInitial) {
      this.apiService.updateSeriesAbsences(this.seriesAbsences).subscribe((response: SeriesAbsence[]) => {
        this.message = { success: true, text: 'Die Serienabwesenheiten wurden erfolgreich angelegt.' };
        this.isLoading = false;
      });
    } else {
      this.apiService.createSeriesAbsence(this.seriesAbsences).subscribe((response: SeriesAbsence[]) => {
        this.message = { success: true, text: 'Die Serienabwesenheiten wurden erfolgreich gespeichert.' };
        this.isLoading = false;
      });
    }
  }

}

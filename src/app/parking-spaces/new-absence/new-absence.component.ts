import { Component, OnInit } from '@angular/core';
import {MyparkApiService} from '../../shared/services/api/mypark-api.service';
import {Absence} from '../../shared/models/mypark.models';

@Component({
  selector: 'mp-new-absence',
  templateUrl: './new-absence.component.html',
  styleUrls: ['./new-absence.component.scss']
})
export class NewAbsenceComponent implements OnInit {

  public start: string;
  public end: string;
  public isLoading: boolean;

  constructor(private apiService: MyparkApiService) {
    this.isLoading = false;
    this.start = Intl.DateTimeFormat('de-de').format(new Date());
    this.end = Intl.DateTimeFormat('de-de').format(new Date());
  }

  ngOnInit() {
  }

  public createAbsence(): void {
    const startDate = new Date(`${this.start}`);
    const endDate = new Date(`${this.end}`);

    this.isLoading = true;
    const absence: Absence = {
      id: null,
      user: null,
      start: startDate,
      end: endDate
    };
    this.apiService.createAbsence(absence).subscribe((response: Absence) => {
      console.log('response', response);

      if (response) {
        // alles war erfolgreich
      } else {
        // Fehler ist aufgetreten
      }
      this.isLoading = false;
    });
  }

}

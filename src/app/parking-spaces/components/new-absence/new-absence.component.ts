import { Component, OnInit } from '@angular/core';
import { DateService, AbsenceService} from '../../../shared/services/public_api';
import {Absence} from '../../../shared/models/mypark.models';

@Component({
  selector: 'mp-new-absence',
  templateUrl: './new-absence.component.html',
  styleUrls: ['./new-absence.component.scss']
})
export class NewAbsenceComponent implements OnInit {

  public start: string;
  public end: string;
  public isLoading: boolean;

  constructor(private absenceService: AbsenceService,
              private dateService: DateService) {
    this.isLoading = false;
    this.start = this.dateService.getToday();
    this.end = this.dateService.getToday();
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
    this.absenceService.createAbsence(absence).subscribe((response: Absence) => {
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

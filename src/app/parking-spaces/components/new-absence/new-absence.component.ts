import {Component, OnInit} from '@angular/core';
import {AbsenceService, DateService} from '../../../shared/services/public_api';
import {Absence} from '../../../shared/models/mypark.models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DateInFutureValidator, DateValidator} from '../../../shared/functions/date-validator';

@Component({
  selector: 'mp-new-absence',
  templateUrl: './new-absence.component.html',
  styleUrls: ['./new-absence.component.scss']
})
export class NewAbsenceComponent implements OnInit {

  public isLoading: boolean;
  public form: FormGroup;
  public submitted: boolean;

  constructor(private absenceService: AbsenceService,
              private dateService: DateService,
              private formBuilder: FormBuilder) {
    this.isLoading = false;
    this.submitted = false;
    const today = this.dateService.getToday();

    this.form = this.formBuilder.group({
      start: [today, [Validators.required, DateInFutureValidator()]],
      end: [today, [Validators.required, DateInFutureValidator()]]
    }, {
      validators: DateValidator('start', 'end')
    });
  }

  ngOnInit() {
  }

  public createAbsence(): void {
    this.submitted = true;
    const startDate = new Date(`${this.form.get('start').value}`);
    const endDate = new Date(`${this.form.get('end').value}`);

    if (!this.form.invalid && !this.checkStartDate(startDate) && !this.checkEndDate(endDate)) {

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

  private checkStartDate(date: Date): boolean {
    const isPast = this.isPast(date);
    if (isPast) {
      this.form.get('start').setErrors({future: {value: date}});
    }
    return isPast;
  }

  private checkEndDate(date: Date): boolean {
    const isPast = this.isPast(date);
    if (isPast) {
      this.form.get('end').setErrors({future: {value: date}});
    }
    return isPast;
  }

  private isPast(date: Date): boolean {
    return date < new Date();
  }
}

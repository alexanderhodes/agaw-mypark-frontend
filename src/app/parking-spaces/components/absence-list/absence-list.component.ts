import {Component, OnInit} from '@angular/core';
import {Absence} from '../../../shared/models/mypark.models';
import {ModalService, DateService, AbsenceService} from '../../../shared/services/public_api';
import {ModalConfiguration} from '../../../shared/models/component.models';

@Component({
  selector: 'mp-absence-list',
  templateUrl: './absence-list.component.html',
  styleUrls: ['./absence-list.component.scss']
})
export class AbsenceListComponent implements OnInit {

  private _absences: Absence[];
  private _deleteAbsence: Absence;
  private _deleteModalAbsenceConfiguration: ModalConfiguration;

  public isLoading: boolean;

  constructor(private absenceService: AbsenceService,
              private modalService: ModalService,
              private dateService: DateService) {
    this.isLoading = false;
  }

  ngOnInit() {
    this.isLoading = true;
    this.absenceService.getAbsences().subscribe((absences: Absence[]) => {
      this._absences = absences;
      this.isLoading = false;
    });
  }

  get absences(): Absence[] {
    return this._absences;
  }

  get deleteModalAbsenceConfiguration(): ModalConfiguration {
    return this._deleteModalAbsenceConfiguration;
  }

  public deleteAbsence(absence: Absence): void {
    this._deleteAbsence = absence;
    const from = this.dateService.formatToGerman(absence.start);
    const until = this.dateService.formatToGerman(absence.end);

    const text = `Möchten Sie die Abwesenheit vom ${from} bis ${until} wirklich löschen?`;
    this._deleteModalAbsenceConfiguration = this.initDeleteModalAbsenceConfiguration(text);
    this.modalService.show(this._deleteModalAbsenceConfiguration.id);
  }

  public confirmDeleteAbsence(event: any): void {
    this.absenceService.deleteAbsence(this._deleteAbsence.id).subscribe((response) => {
      const index = this._absences.findIndex((absence: Absence) => {
        return absence.id === this._deleteAbsence.id;
      });

      if (index > -1) {
        this._absences.splice(index, 1);
      }
      this._deleteAbsence = null;
    });
  }

  private initDeleteModalAbsenceConfiguration(text: string): ModalConfiguration {
    return {
      id: 'modalDeleteAbsence',
      title: 'Abwesenheit löschen',
      text,
      closeText: 'bestätigen'
    };
  }

}

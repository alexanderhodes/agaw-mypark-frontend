import { Component, OnInit } from '@angular/core';
import {Absence} from '../../shared/models/mypark.models';
import {MyparkApiService} from '../../shared/services/api/mypark-api.service';

@Component({
  selector: 'mp-absence-list',
  templateUrl: './absence-list.component.html',
  styleUrls: ['./absence-list.component.scss']
})
export class AbsenceListComponent implements OnInit {

  private _absences: Absence[];

  constructor(private apiService: MyparkApiService) { }

  ngOnInit() {
    this.apiService.getAbsences().subscribe((absences: Absence[]) => {
      this._absences = absences;
    });
  }

  get absences(): Absence[] {
    return this._absences;
  }

}

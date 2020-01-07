import { Component, OnInit } from '@angular/core';
import {MyparkApiService} from '../../../shared/services/api/mypark-api.service';
import {Problem} from '../../../shared/models/mypark.models';

@Component({
  selector: 'mp-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.scss']
})
export class ProblemsComponent implements OnInit {

  private _problems: Problem[];

  public isLoading: boolean;

  constructor(private apiService: MyparkApiService) {
    this.isLoading = false;
  }

  ngOnInit() {
    this.isLoading = true;
    this.apiService.getProblems().subscribe((problems: Problem[]) => {
      this._problems = problems;
      this.isLoading = false;
    });
  }

  get problems(): Problem[] {
    return this._problems;
  }
}

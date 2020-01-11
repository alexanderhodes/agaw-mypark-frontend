import { Component, OnInit } from '@angular/core';
import {MyparkApiService} from '../../../shared/services/api/mypark-api.service';
import {Problem} from '../../../shared/models/mypark.models';
import {ProblemService} from '../../../shared/services/api/problem.service';

@Component({
  selector: 'mp-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.scss']
})
export class ProblemsComponent implements OnInit {

  private _problems: Problem[];

  public isLoading: boolean;

  constructor(private problemService: ProblemService) {
    this.isLoading = false;
  }

  ngOnInit() {
    this.isLoading = true;
    this.problemService.getProblems().subscribe((problems: Problem[]) => {
      this._problems = problems;
      this.isLoading = false;
    });
  }

  get problems(): Problem[] {
    return this._problems;
  }
}

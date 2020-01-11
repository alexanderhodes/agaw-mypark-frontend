import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Problem} from '../../models/mypark.models';
import {Observable} from 'rxjs';

@Injectable()
export class ProblemService {

  constructor(private apiService: ApiService) { }

  public createProblem(body: Problem): Observable<Problem> {
    return this.apiService.post<Problem>(`problems`, body);
  }

  public getProblems(): Observable<Problem[]> {
    return this.apiService.get<Problem[]>(`problems`);
  }

}

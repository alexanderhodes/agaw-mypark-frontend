import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Absence} from '../../models/mypark.models';

@Injectable()
export class AbsenceService {

  constructor(private apiService: ApiService) { }

  public getAbsences(): Observable<Absence[]> {
    return this.apiService.get<Absence[]>(`absences/user`);
  }

  public createAbsence(body: Absence): Observable<Absence> {
    return this.apiService.post<Absence>(`absences`, body);
  }

  public updateAbsence(id: string, body: Absence): Observable<Absence> {
    return this.apiService.put<Absence>(`absences/${id}`, body);
  }

  public deleteAbsence(id: string): Observable<any> {
    return this.apiService.delete(`absences/${id}`);
  }

}

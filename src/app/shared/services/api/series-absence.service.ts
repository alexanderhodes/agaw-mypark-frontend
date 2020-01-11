import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {SeriesAbsence} from '../../models/mypark.models';
import {Observable} from 'rxjs';

@Injectable()
export class SeriesAbsenceService {

  constructor(private apiService: ApiService) { }

  public createSeriesAbsence(body: SeriesAbsence[]): Observable<SeriesAbsence[]> {
    return this.apiService.post<SeriesAbsence[]>(`seriesabsences`, body);
  }

  public getSeriesAbsences(): Observable<SeriesAbsence[]> {
    return this.apiService.get<SeriesAbsence[]>(`seriesabsences`);
  }

  public updateSeriesAbsences(body: SeriesAbsence[]): Observable<SeriesAbsence[]> {
    return this.apiService.put<SeriesAbsence[]>(`seriesabsences`, body);
  }

}

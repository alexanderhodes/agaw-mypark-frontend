import {ParkingSpace, User} from '../../models/mypark.models';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {Injectable} from '@angular/core';

@Injectable()
export class ParkingSpaceService {

  constructor(private apiService: ApiService) {}

  public getAllParkingSpaces(): Observable<ParkingSpace[]> {
    return this.apiService.get<ParkingSpace[]>('parkingspaces');
  }

  public createParkingSpace(body: ParkingSpace): Observable<ParkingSpace> {
    return this.apiService.post<ParkingSpace>('parkingspaces', body);
  }

  public updateParkingSpace(body: ParkingSpace): Observable<ParkingSpace> {
    return this.apiService.put<ParkingSpace>(`parkingspaces/${body.id}`, body);
  }

  public deleteParkingSpace(body: ParkingSpace): Observable<ParkingSpace> {
    return this.apiService.delete<ParkingSpace>(`parkingspaces/${body.id}`);
  }

  public getUsersWithParkingSpace(): Observable<User[]> {
    return this.apiService.get<User[]>(`users/parkingspace`);
  }

  public getParkingSpacesWithUsers(): Observable<[]> {
    return this.apiService.get<[]>(`parkingspaces/admin`);
  }

}

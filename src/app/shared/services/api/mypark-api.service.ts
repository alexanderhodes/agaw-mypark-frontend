import { ParkingSpace, Authentication, User } from './../../models/mypark.models';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class MyparkApiService {

    constructor(private apiService: ApiService) { }

    getAllParkingSpaces() {
        return this.apiService.get<ParkingSpace[]>('parkingspaces');
    }

    createParkingSpace(body: ParkingSpace): Observable<ParkingSpace> {
        return this.apiService.post<ParkingSpace>('parkingspaces', body);
    }

    updateParkingSpace(body: ParkingSpace): Observable<ParkingSpace> {
        return this.apiService.put<ParkingSpace>(`parkingspaces/${body.number}`, body);
    }

    deleteParkingSpace(body: ParkingSpace): Observable<ParkingSpace> {
        return this.apiService.delete<ParkingSpace>(`parkingspaces/${body.number}`);
    }

    login(username: string, password: string): Observable<Authentication> {
        return this.apiService.get<Authentication>(`authenticate?username=${username}&password=${password}`);
    }

    requestPasswordReset(email: string): Observable<User> {
      return this.apiService.get<User>(`common/password/request/?email=${email}`);
    }

    updatePasswordInPasswordReset(token: string): Observable<User> {
      return this.apiService.get<User>(`common/password/reset/token/${token}`);
    }

}
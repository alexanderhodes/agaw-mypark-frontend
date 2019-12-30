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

    login(body: FormData): Observable<Authentication> {
        return this.apiService.post<Authentication>(`authenticate`, body);
    }

    requestPasswordReset(email: string): Observable<User> {
      return this.apiService.get<User>(`common/password/request/?email=${email}`);
    }

    validatePasswordResetToken(token: string): Observable<User> {
        return this.apiService.get(`common/password/validation/${token}`);
    }

    updatePasswordInPasswordReset(token: string, body: FormData): Observable<any> {
      return this.apiService.post(`common/password/reset/${token}`, body);
    }



}

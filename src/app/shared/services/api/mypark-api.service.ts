import {ParkingSpace, Authentication, User, Booking, BookingStatus, Problem} from './../../models/mypark.models';
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

    validateRegistrationToken(token: string): Observable<any> {
        return this.apiService.get(`common/register/validation/${token}`);
    }

    getAllUsers(): Observable<User[]> {
        return this.apiService.get<User[]>(`users`);
    }

    getCurrentUser(): Observable<User> {
      return this.apiService.get<User>(`users/current`);
    }

    deleteUser(id: string): Observable<any> {
      return this.apiService.delete(`users/${id}`);
    }

    updateUser(id: string, body: User): Observable<User> {
      return this.apiService.put<User>(`users/${id}`, body);
    }

    getBookings(): Observable<Booking[]> {
      return this.apiService.get<Booking[]>(`bookings/users`);
    }

    createBooking(body: Booking): Observable<Booking> {
      return this.apiService.post<Booking>(`bookings`, body);
    }

    getBookingForToday(date: string): Observable<Booking> {
      return this.apiService.get<Booking>(`bookings/users/${date}`);
    }

    createProblem(body: Problem): Observable<Problem> {
      return this.apiService.post<Problem>(`problems`, body);
    }

    getProblems(): Observable<Problem[]> {
      return this.apiService.get<Problem[]>(`problems`);
    }

}

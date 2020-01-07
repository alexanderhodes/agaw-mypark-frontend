import {
  ParkingSpace,
  Authentication,
  User,
  Booking,
  BookingStatus,
  Problem,
  SeriesBooking,
  Absence,
  SeriesAbsence
} from './../../models/mypark.models';
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
        return this.apiService.put<ParkingSpace>(`parkingspaces/${body.id}`, body);
    }

    deleteParkingSpace(body: ParkingSpace): Observable<ParkingSpace> {
        return this.apiService.delete<ParkingSpace>(`parkingspaces/${body.id}`);
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

    updateAdminRights(id: string): Observable<User> {
      return this.apiService.put<User>(`users/${id}/admin`, null);
    }

    getBookings(): Observable<Booking[]> {
      return this.apiService.get<Booking[]>(`bookings/users`);
    }

    createBooking(body: Booking): Observable<Booking> {
      return this.apiService.post<Booking>(`bookings`, body);
    }

    updateBooking(id: string, body: Booking): Observable<Booking> {
      return this.apiService.put<Booking>(`bookings/${id}`, body);
    }

    deleteBooking(id: string): Observable<any> {
      return this.apiService.delete(`bookings/${id}`);
    }

    getBookingForToday(date: string): Observable<Booking> {
      return this.apiService.get<Booking>(`bookings/users/${date}`);
    }

    getAbsences(): Observable<Absence[]> {
      return this.apiService.get<Absence[]>(`absences/user`);
    }

    createAbsence(body: Absence): Observable<Absence> {
      return this.apiService.post<Absence>(`absences`, body);
    }

    updateAbsence(id: string, body: Absence): Observable<Absence> {
      return this.apiService.put<Absence>(`absences/${id}`, body);
    }

    deleteAbsence(id: string): Observable<any> {
      return this.apiService.delete(`absences/${id}`);
    }

    createProblem(body: Problem): Observable<Problem> {
      return this.apiService.post<Problem>(`problems`, body);
    }

    getProblems(): Observable<Problem[]> {
      return this.apiService.get<Problem[]>(`problems`);
    }

    createSeriesBooking(body: SeriesBooking[]): Observable<SeriesBooking[]> {
      return this.apiService.post<SeriesBooking[]>(`seriesbookings`, body);
    }

    getSeriesBookings(): Observable<SeriesBooking[]> {
      return this.apiService.get<SeriesBooking[]>(`seriesbookings`);
    }

    updateSeriesBooking(body: SeriesBooking[]): Observable<SeriesBooking[]> {
      return this.apiService.put<SeriesBooking[]>(`seriesbookings`, body);
    }

    createSeriesAbsence(body: SeriesAbsence[]): Observable<SeriesAbsence[]> {
      return this.apiService.post<SeriesAbsence[]>(`seriesabsences`, body);
    }

    getSeriesAbsences(): Observable<SeriesAbsence[]> {
      return this.apiService.get<SeriesAbsence[]>(`seriesabsences`);
    }

    updateSeriesAbsences(body: SeriesAbsence[]): Observable<SeriesAbsence[]> {
      return this.apiService.put<SeriesAbsence[]>(`seriesabsences`, body);
    }
}

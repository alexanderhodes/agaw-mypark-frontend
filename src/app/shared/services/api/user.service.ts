import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Authentication, User} from '../../models/mypark.models';

@Injectable()
export class UserService {

  constructor(private apiService: ApiService) {}

  public getAllUsers(): Observable<User[]> {
    return this.apiService.get<User[]>(`users`);
  }

  public getCurrentUser(): Observable<User> {
    return this.apiService.get<User>(`users/current`);
  }

  public deleteUser(id: string): Observable<any> {
    return this.apiService.delete(`users/${id}`);
  }

  public updateUser(id: string, body: User): Observable<User> {
    return this.apiService.put<User>(`users/${id}`, body);
  }

  public updateAdminRights(id: string): Observable<User> {
    return this.apiService.put<User>(`users/${id}/admin`, null);
  }

  public getAdminUsers(): Observable<User[]> {
    return this.apiService.get<User[]>(`users/admin`);
  }

}

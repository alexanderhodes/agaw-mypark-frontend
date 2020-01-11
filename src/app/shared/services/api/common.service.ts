import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Authentication, User} from '../../models/mypark.models';

@Injectable()
export class CommonService {

  constructor(private apiService: ApiService) {}

  public requestPasswordReset(email: string): Observable<User> {
    return this.apiService.get<User>(`common/password/request/?email=${email}`);
  }

  public validatePasswordResetToken(token: string): Observable<User> {
    return this.apiService.get(`common/password/validation/${token}`);
  }

  public login(body: FormData): Observable<Authentication> {
    return this.apiService.post<Authentication>(`authenticate`, body);
  }

  public updatePasswordInPasswordReset(token: string, body: FormData): Observable<any> {
    return this.apiService.post(`common/password/reset/${token}`, body);
  }

  public validateRegistrationToken(token: string): Observable<any> {
    return this.apiService.get(`common/register/validation/${token}`);
  }

}

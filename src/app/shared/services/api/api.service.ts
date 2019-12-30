import { LocalStorageService } from './../local-storage.service';
import { LOCALSTORAGE_KEY_TOKEN } from './../../config/mypark.config';
import { ApiErrorHandler } from './api-error-handler';
import { environment } from './../../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

    constructor(private http: HttpClient, private errorHandler: ApiErrorHandler,
                private localStorageService: LocalStorageService) {

    }

    get<T>(url: string): Observable<T> {
        const apiUrl = this.createApiUrl(url);
        const headers = this.createHttpHeaders();

        return this.http.get<T>(apiUrl, headers).pipe(
            tap(),
            // catchError(this.errorHandler.handleError<T>(`get ${apiUrl}`))
        );
    }

    post<T>(url: string, body: any): Observable<T> {
        const apiUrl = this.createApiUrl(url);
        const headers = this.createHttpHeaders();

        return this.http.post<T>(apiUrl, body, headers).pipe(
            tap(),
            // catchError(this.errorHandler.handleError<T>(`post ${apiUrl}`))
        );
    }

    delete<T>(url: string): Observable<T> {
        const apiUrl = this.createApiUrl(url);
        const headers = this.createHttpHeaders();

        return this.http.delete<T>(apiUrl, headers).pipe(
            tap(),
            // catchError(this.errorHandler.handleError<T>(`delete ${apiUrl}`))
        );
    }

    put<T>(url: string, body: any): Observable<T> {
        const apiUrl = this.createApiUrl(url);
        const headers = this.createHttpHeaders();

        return this.http.put<T>(apiUrl, body, headers).pipe(
            tap(),
            // catchError(this.errorHandler.handleError<T>(`put ${apiUrl}`))
        );
    }

    private createHttpHeaders() {
        const token: string = this.localStorageService.getItem(LOCALSTORAGE_KEY_TOKEN);

        return token ? {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            })
        } : {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
          })
      };
    }

    private createApiUrl(resource: string): string {
        return `${environment.API_URL}/${resource}`;
    }

}

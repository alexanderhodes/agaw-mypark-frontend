import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiErrorHandler {

    constructor() {}

    public handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.log('handle error:');
            console.log(error);
            console.log(`${operation} failed: ${error.message}`);

            return of(result as T);
        };
    }

}

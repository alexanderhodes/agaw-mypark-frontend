import { Injectable } from '@angular/core';
import { LOCALSTORAGE_KEY_PREFIX } from '../config/mypark.config';

@Injectable()
export class LocalStorageService {

    constructor() {}

    public setItem(key: string, value: string): void {
      const keyWithPrefix = this.getKeyWithPrefix(key);
      localStorage.setItem(keyWithPrefix, value);
    }

    public getItem(key: string): string {
      const keyWithPrefix = this.getKeyWithPrefix(key);
      return localStorage.getItem(keyWithPrefix);
    }

    public removeItem(key: string): void {
      const keyWithPrefix = this.getKeyWithPrefix(key);
      localStorage.removeItem(keyWithPrefix);
    }

    public clear(): void {
      localStorage.clear();
    }

    private getKeyWithPrefix(key: string): string {
      return `${LOCALSTORAGE_KEY_PREFIX}-${key}`;
    }

}

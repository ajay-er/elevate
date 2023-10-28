import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  saveKeys(data: any) {
    for (const key in data) {
      this.save(key, data[key]);
    }
  }

  save(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  get(key: string): string | null {
    return localStorage.getItem(key);
  }

  clear(): void {
    window.localStorage.clear();
    window.sessionStorage.clear();
  }
 
  isTokenAvailable(){
    return sessionStorage.getItem('googleToken') || sessionStorage.getItem('session') ;
  }
}

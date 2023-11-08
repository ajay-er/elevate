import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FoundersService {
  private http = inject(HttpClient);

  getStartups(){
    return this.http.get('/fou/founders/startups');
  }
}

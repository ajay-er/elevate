import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoundersService {
  private http = inject(HttpClient);
  startupApi = environment.apiUrl_startups;

  getStartups() {
    return this.http.get(`${this.startupApi}/startups/startups`);
  }

  addNewStartup(data:any) {
    return this.http.post(`${this.startupApi}/startups/add-startup`,data);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoundersService {
  private http = inject(HttpClient);
  api = environment.apiUrl;

  getStartups() {
    return this.http.get(`${this.api}/startups/startups`);
  }

  addNewStartup(data:any) {
    return this.http.post(`${this.api}/startups/add-startup`,data);
  }

  getLogoUrl(data:any) {
    return this.http.post(`${this.api}/startups/send-logo`,data);
  }
  getBannerUrl(data:any) {
    return this.http.post(`${this.api}/startups/send-banner`,data);
  }
}

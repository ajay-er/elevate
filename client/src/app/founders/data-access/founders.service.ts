import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FoundersService {
  private http = inject(HttpClient);
  api = environment.apiUrl;

  search(input: any) {
    return this.http.get(`${this.api}/search/startup?q=${input}`);
  }
  
}

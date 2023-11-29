import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IUpdateName, IUpdatePhone } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);
  private authApi = environment.apiUrl;

  getProfile() {
    return this.http.get(`${this.authApi}/profile/get-profile`);
  }

  updateName(data: IUpdateName) {
    return this.http.patch(`${this.authApi}/profile/update-name`, data);
  }

  updatePhone(data: IUpdatePhone) {
    return this.http.patch(`${this.authApi}/profile/update-phone`, data);
  }

  updateProfileImage(data: FormData) {
    return this.http.post(`${this.authApi}`, data);
  }
}

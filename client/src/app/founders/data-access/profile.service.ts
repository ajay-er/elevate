import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IUpdateName, IUpdatePhone, IAddress, IUpdateImage } from 'src/app/shared/interfaces';
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

  upsertAddress(data: IAddress) {
    return this.http.patch(`${this.authApi}/profile/upsert-address`, data);
  }

  updateProfileImage(data:IUpdateImage) {    
    return this.http.patch(`${this.authApi}/profile/update-image`, data);
  }

  uploadSignature(vals:any) {
    const data = vals;
    return this.http.post('https://api.cloudinary.com/v1_1/elevate-connect/image/upload',data);
  }
}

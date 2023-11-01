import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IUpdateName, IUpdatePhone, IAddress, IUpdateImage } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);

  getProfile() {
    return this.http.get('/api/auth/get-profile');
  }

  updateName(data: IUpdateName) {
    return this.http.patch('/api/auth/update-name', data);
  }

  updatePhone(data: IUpdatePhone) {
    return this.http.patch('/api/auth/update-phone', data);
  }

  upsertAddress(data: IAddress) {
    return this.http.patch('/api/auth/upsert-address', data);
  }

  updateProfileImage(data:IUpdateImage){
    return this.http.patch('/api/auth/update-image', data);
  }
}

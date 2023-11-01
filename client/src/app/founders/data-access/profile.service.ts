import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

interface IUpdateName {
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);
  
  updateName(data: IUpdateName) {
    return this.http.patch('/api/auth/updatename', data);
  }

  getProfile(){
    return this.http.get('/api/auth/getprofile');
  }
}

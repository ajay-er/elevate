import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { IUpdateName, IUpdatePhone, IAddress, IUpdateImage } from "src/app/shared/interfaces";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  private http = inject(HttpClient);

  getProfile() {
    return this.http.get("/api/profile/get-profile");
  }

  updateName(data: IUpdateName) {
    return this.http.patch("/api/profile/update-name", data);
  }

  updatePhone(data: IUpdatePhone) {
    return this.http.patch("/api/profile/update-phone", data);
  }

  upsertAddress(data: IAddress) {
    return this.http.patch("/api/profile/upsert-address", data);
  }

  updateProfileImage(data:IUpdateImage) {    
    return this.http.patch("/api/profile/update-image", data);
  }

  uploadSignature(vals:any) {
    const data = vals;
    return this.http.post("https://api.cloudinary.com/v1_1/elevate-connect/image/upload",data);
  }
}

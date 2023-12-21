import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonApiService } from 'src/app/shared/data-access/api.service';
import { AdminService } from '../../data-access/admin.service';

@Component({
  selector: 'app-edit-founder',
  templateUrl: './edit-founder.component.html',
  styleUrls: ['./edit-founder.component.css']
})
export class EditFounderComponent {
  userData: any = {}; 
  private route = inject(ActivatedRoute);
  private commonApi = inject(CommonApiService);
  private adminServie = inject(AdminService);
  private id!:any;
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (!this.id) { return; }
      this.commonApi.getProfileFounder(this.id).subscribe((res: any) => {
        this.userData = res.founder;
      });
    });
  }

  updateUser() {
    this.adminServie.updateFounderData(this.userData,this.id).subscribe((res:any) => {
      console.log(res);
    });
  }
}

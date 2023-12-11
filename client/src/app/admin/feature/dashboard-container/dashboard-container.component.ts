import { Component, inject } from '@angular/core';
import { AdminService } from '../../data-access/admin.service';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.css']
})
export class DashboardContainerComponent {

  private adminService = inject(AdminService);
  private investors:any[] = [];
  ngOnInit() {
    this.adminService.getLatestInvestors().subscribe((res:any) => {
      this.investors = res.result;
      console.log(res);
      
    });
  }
  

}

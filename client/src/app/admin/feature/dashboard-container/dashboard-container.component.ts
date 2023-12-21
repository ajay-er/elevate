import { Component, inject } from '@angular/core';
import { AdminService } from '../../data-access/admin.service';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.css']
})
export class DashboardContainerComponent {

  private adminService = inject(AdminService);
  investors:any[] = [];
  investorsCount!:number;
  foundersCount!:number;
  totalSubscriptionCount!:number;
  totalpendingSubscriptionCount!:number;
  totalprofit!:number;
  notVerifiedInvestors!:number;
  ngOnInit() {
    this.adminService.getLatestInvestors().subscribe((res:any) => {
      this.investors = res.result; 
      console.log(this.investors);
           
    });

    this.adminService.getVerifiedInvestorsCount().subscribe((res:any) => {
      this.investorsCount = res.result; 
    });

    this.adminService.getLatestFoundersCount().subscribe((res:any) => {
      this.foundersCount = res.result; 
    });

    this.adminService.totalSubscriptions().subscribe((res:any) => {
      this.totalSubscriptionCount = res.result; 
    });

    this.adminService.totalPendingSubscriptions().subscribe((res:any) => {
      this.totalpendingSubscriptionCount = res.result; 
      
    });

    this.adminService.totalProfit().subscribe((res:any) => {      
      this.totalprofit = res.result[0]?.totalProfit || 0; 
    });

    this.adminService.getNotVerifiedInvestorsCount().subscribe((res:any) => {      
      this.notVerifiedInvestors = res.result;
    });
  }
  
}

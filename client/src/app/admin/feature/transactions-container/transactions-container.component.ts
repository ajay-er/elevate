import { Component, inject } from '@angular/core';
import { AdminService } from '../../data-access/admin.service';

@Component({
  selector: 'app-transactions-container',
  templateUrl: './transactions-container.component.html',
  styleUrls: ['./transactions-container.component.css']
})
export class TransactionsContainerComponent {
  private adminService = inject(AdminService);
  allSubs:any;

  coloumnArray : any[] = [
    {header:'UserId',fieldName:'user',datatype:'string'},
    {header:'Plan',fieldName:'plan',datatype:'string'},
    {header:'Status',fieldName:'status',datatype:'string'},
    {header:'Payment',fieldName:'paymentDetails.paymentStatus',datatype:'string'},
  ];
  
  ngOnInit() {
    this.adminService.allSubscriptions().subscribe((res:any) => {
      console.log(res);
      this.allSubs = res.result;
    });
  }
}

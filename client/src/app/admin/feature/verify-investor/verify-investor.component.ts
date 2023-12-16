import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TableModule } from 'src/app/shared/ui/table/table.module';
import { AdminService } from '../../data-access/admin.service';

@Component({
  selector: 'app-verify-investor',
  standalone: true,
  imports: [
    CommonModule,
    TableModule
  ],
  template: `
<div class="p-4 sm:ml-64 min-h-screen">
<ng-container *ngIf="investors?.length > 0; else noInvestors">
  <app-table [gridArray]="investors" [buttonPresent]="true" [columnArray]="coloumnArray" (onEdit)="verify($event)" (onDelete)="blockUser($event)" ></app-table>
</ng-container>

<ng-template #noInvestors>
  <p class="text-blac pt-28 text-3xl text-center">All investors verified</p>
</ng-template>

</div>

  `,
})
export class VerifyInvestorComponent {
  protected investors: any;

  private adminService = inject(AdminService);
  private router = inject(Router);
  
  coloumnArray : any[] = [
    {header:'Investor Name',fieldName:'user.firstName',datatype:'any'},
    {header:'Investment count',fieldName:'totalInvestmentCount',datatype:'number'},
    {header:'Investment amount(₹)',fieldName:'investmentAmount',datatype:'amount'},
    {header:'Linkedin',fieldName:'socialMediaLinks.linkedin',datatype:'any'},
    {header:'Email',fieldName:'user.email',datatype:'string'},
  ];
    
  ngOnInit() {
    this.adminService.getUnverifiedInvestors().subscribe((res:any) => {
      this.investors = res.result;
    });
  }

  blockUser(event:any) {
    console.log(event);
  }

  verify(event:any) {
    console.log(event);
    this.router.navigate(['/admin/investor/verify',event.id]);
  }

}

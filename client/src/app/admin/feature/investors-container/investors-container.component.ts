import { Component, inject } from '@angular/core';
import { AdminService } from '../../data-access/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-investors-container',
  templateUrl: './investors-container.component.html',
  styleUrls: ['./investors-container.component.css']
})
export class InvestorsContainerComponent {
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
    this.adminService.getLatestInvestors().subscribe((res:any) => {
      this.investors = res.result;
    });
  }

  editUser(event:any) {
    console.log(event);
    this.router.navigate(['/admin/investors',event.id]);
  }
  
}

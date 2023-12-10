import { Component, inject } from '@angular/core';
import { InvestorsService } from '../../../investors/data-access/investors.service';

@Component({
  selector: 'app-investors-list',
  templateUrl: './investors-list.component.html',
  styleUrls: ['./investors-list.component.css'],
})
export class InvestorsListComponent {
  private investorsService = inject(InvestorsService);
  investors:any;

  coloumnArray : any[] = [
    {header:'Investor Name',fieldName:'user.firstName',datatype:'any'},
    {header:'Locations',fieldName:'investmentLocations',datatype:'[]'},
    {header:'Markets',fieldName:'investmentMarkets',datatype:'[]'},
    {header:'Investment count',fieldName:'totalInvestmentCount',datatype:'number'},
    {header:'Investment amount(₹)',fieldName:'investmentAmount',datatype:'amount'},
    {header:'Linkedin',fieldName:'socialMediaLinks.linkedin',datatype:'any'},
    {header:'Email',fieldName:'user.email',datatype:'string'},
  ];

  ngOnInit() {
    this.investorsService.getAllInvestors().subscribe((res:any) => {
      this.investors = res.result;
      console.log(this.investors);
    });
  }
}

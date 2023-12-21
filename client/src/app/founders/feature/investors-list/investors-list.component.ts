import { Component, inject } from '@angular/core';
import { InvestorsService } from '../../../investors/data-access/investors.service';
import { Countries, Technology } from 'src/app/shared/interfaces';
import { countries } from 'src/app/shared/interfaces/countries';
import { technologies } from 'src/app/shared/interfaces/markets';

@Component({
  selector: 'app-investors-list',
  templateUrl: './investors-list.component.html',
  styleUrls: ['./investors-list.component.css'],
})
export class InvestorsListComponent {
  private investorsService = inject(InvestorsService);
  investors:any;
  countries:Countries[] = countries;
  markets:Technology[] = technologies;
  currentPage = 1;
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
    this.fetchData(this.currentPage);
  }

  fetchData(page:number) {
    this.investorsService.getAllInvestors(page).subscribe((res:any) => {
      this.investors = res.result;
      console.log(this.investors);
    });
  }

  pageChanged(event:number) {
    this.currentPage = event;
    this.fetchData(this.currentPage);
  }
}

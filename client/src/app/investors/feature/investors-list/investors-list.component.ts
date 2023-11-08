import { Component, inject } from '@angular/core';
import { InvestorsService } from '../../data-access/investors.service';

@Component({
  selector: 'app-investors-list',
  templateUrl: './investors-list.component.html',
  styleUrls: ['./investors-list.component.css'],
})
export class InvestorsListComponent {
  protected investors!: any;
  private investorsService = inject(InvestorsService);
  
  ngOnInit() {
    this.investorsService.getAllInvestors().subscribe((res: any) => {
      console.log(res.result);
      this.investors = res.result;
    });
  }



}

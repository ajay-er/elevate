import { Component, inject } from '@angular/core';
import { InvestorsService } from '../../../investors/data-access/investors.service';

@Component({
  selector: 'app-investors-list',
  templateUrl: './investors-list.component.html',
  styleUrls: ['./investors-list.component.css'],
})
export class InvestorsListComponent {
  private investorsService = inject(InvestorsService);
  protected investors:any;
  ngOnInit() {
    this.investorsService.getAllInvestors().subscribe((res:any) => {
      this.investors = res.result;
      
    });
  }


}

import { Component, inject } from '@angular/core';
import { InvestorsService } from '../../data-access/investors.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fill-investor-details',
  templateUrl: './fill-investor-details.component.html',
  styleUrls: ['./fill-investor-details.component.css']
})
export class FillInvestorDetailsComponent {
  private investorService = inject(InvestorsService);
  private router = inject(Router);

  completeInvestorDetails(data:any) {
    this.investorService.completeInvestorDetails(data).subscribe((res:any) => {
      this.router.navigateByUrl('/investors');
    });
  }
}

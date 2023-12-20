import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IInvestorData } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-investor-detail',
  templateUrl: './investor-detail.component.html',
  styleUrls: ['./investor-detail.component.css']
})
export class InvestorDetailComponent {
  investor!: IInvestorData | null;
  isFounderHavePremium!: string | null;
  private route = inject(ActivatedRoute);
  ngOnInit() {
    const data = this.route.snapshot.data['investor'];
    this.investor = data.investor;
    this.isFounderHavePremium = data.subscription;
    console.log(this.investor);
  }
}

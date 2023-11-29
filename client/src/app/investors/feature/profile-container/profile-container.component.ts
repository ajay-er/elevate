import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvestorsService } from '../../data-access/investors.service';

@Component({
  selector: 'app-profile-container',
  templateUrl: './profile-container.component.html',
  styleUrls: ['./profile-container.component.css'],
})
export class ProfileContainerComponent {
  private route = inject(ActivatedRoute);
  private investorService = inject(InvestorsService);

  ngOnInit() {
   
  }
}

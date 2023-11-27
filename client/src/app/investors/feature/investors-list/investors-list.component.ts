import { Component, inject } from '@angular/core';
import { InvestorsService } from '../../data-access/investors.service';

@Component({
  selector: 'app-investors-list',
  templateUrl: './investors-list.component.html',
  styleUrls: ['./investors-list.component.css'],
})
export class InvestorsListComponent {
  private investorsService = inject(InvestorsService);
  
  ngOnInit() {
    
  }


}

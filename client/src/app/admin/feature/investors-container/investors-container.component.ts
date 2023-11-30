import { Component, inject } from '@angular/core';
import { AdminService } from '../../data-access/admin.service';

@Component({
  selector: 'app-investors-container',
  templateUrl: './investors-container.component.html',
  styleUrls: ['./investors-container.component.css']
})
export class InvestorsContainerComponent {
  protected investors: any;

  private adminService = inject(AdminService);

  
}

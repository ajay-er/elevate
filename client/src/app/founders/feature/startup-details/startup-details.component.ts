import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoundersService } from '../../data-access/founders.service';

@Component({
  selector: 'app-startup-details',
  templateUrl: './startup-details.component.html',
  styleUrls: ['./startup-details.component.css']
})
export class StartupDetailsComponent {
  private route = inject(ActivatedRoute);
  private foundersService = inject(FoundersService);
  protected startup!:any;
  ngOnInit(): void {
    this.route.params.subscribe((params:any) => {
      const id = params['id'];
      this.foundersService.getStartupData(id).subscribe((res:any) => {
        console.log(res.result);
        this.startup = res.result;
      });
    });
  }
}

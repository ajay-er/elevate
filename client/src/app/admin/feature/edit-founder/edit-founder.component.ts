import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonApiService } from 'src/app/shared/data-access/api.service';

@Component({
  selector: 'app-edit-founder',
  templateUrl: './edit-founder.component.html',
  styleUrls: ['./edit-founder.component.css']
})
export class EditFounderComponent {

  private route = inject(ActivatedRoute);
  private commonApi = inject(CommonApiService);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) { return; }
      this.commonApi.getProfileFounder(id).subscribe((res: any) => {
        console.log(res);
      });
    });
  }
}

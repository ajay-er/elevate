import { Component, inject } from '@angular/core';
import { FoundersService } from '../../data-access/founders.service';
import { IStartup } from 'src/app/shared/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-founders',
  templateUrl: './add-founders.component.html',
  styleUrls: ['./add-founders.component.css'],
})
export class AddFoundersComponent {
  private founderService = inject(FoundersService);
  private router = inject(Router);

  addStartup(data: IStartup) {
    this.founderService.addNewStartup(data).subscribe((res) => {
      this.router.navigateByUrl('/founders');
    });
  }
}

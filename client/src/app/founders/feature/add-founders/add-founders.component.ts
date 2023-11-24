import { Component, inject } from '@angular/core';
import { FoundersService } from '../../data-access/founders.service';
import { IStartup } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-add-founders',
  templateUrl: './add-founders.component.html',
  styleUrls: ['./add-founders.component.css'],
})
export class AddFoundersComponent {
  private founderService = inject(FoundersService);
  addStartup(data: IStartup) {  
    this.founderService.addNewStartup(data).subscribe((res) => {
      console.log(res);
    });
  }

}
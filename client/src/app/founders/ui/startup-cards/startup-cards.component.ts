import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-startup-cards',
  templateUrl: './startup-cards.component.html',
  styleUrls: ['./startup-cards.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartupCardsComponent {
  @Input() description!:string;
  @Input() imgsrc!:string; 
  @Input() title!:string; 
  @Input() id!:string; 

  
}

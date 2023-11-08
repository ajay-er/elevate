import {
  Component,
  Input,
  inject,
} from '@angular/core';
import { InvestorsService } from '../../data-access/investors.service';

@Component({
  selector: 'app-investor-card',
  templateUrl: './investor-card.component.html',
  styleUrls: ['./investor-card.component.css'],
})
export class InvestorCardComponent {
  @Input() imgsrc!: string;
  @Input() name!: string;
  @Input() description!: string;
  @Input() investorId!: string;

}

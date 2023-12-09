import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-investor-tab',
  templateUrl: './investor-tab.component.html',
  styleUrls: ['./investor-tab.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestorTabComponent {
@Input() investors:any;

protected tableHeader = {
  
};

ngOnInit() {
  
}
  
}

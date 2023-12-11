import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-investor-tab',
  templateUrl: './investor-tab.component.html',
  styleUrls: ['./investor-tab.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestorTabComponent {
@Input() columnArray: any[] = [];
@Input() investorDetail: any[] = [];

getValue(obj: any, path: string): any {
  const properties = path.split('.');
  return properties.reduce((prev, curr) => {
    if (prev && typeof prev === 'object' && curr in prev) {
      return prev[curr];
    } else {
      return undefined; 
    }
  }, obj);
}

}

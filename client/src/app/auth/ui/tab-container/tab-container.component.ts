import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrls: ['./tab-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabContainerComponent {
  login: boolean = true;
  changeTab() {
    this.login = !this.login;
  }

  getCss1() {
    return {
      'text-gray-900': !this.login,
      'bg-black': this.login,
    };
  }
  getCss2() {
    return {
      'text-gray-900': this.login,
      'bg-black': !this.login,
    };
  }
}

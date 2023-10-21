import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  isNavbarOpen = false;
  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }
}

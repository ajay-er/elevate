import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminNavComponent {
  isDropdownOpen = false;
  toggleProfileDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logOut(){}
}

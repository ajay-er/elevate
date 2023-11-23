import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/data-access/local-storage.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminNavComponent {
  private localStoreService = inject(LocalStorageService);
  private router = inject(Router);

  isDropdownOpen = false;
  toggleProfileDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logOut() {
    this.localStoreService.clear();
    this.router.navigateByUrl('/ideas');
  }
}
 
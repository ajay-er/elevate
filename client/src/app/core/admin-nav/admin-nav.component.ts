import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/data-access/local-storage.service';
import { PagelayoutService } from 'src/app/shared/data-access/pagelayout.service';
import { IRole } from 'src/app/shared/types';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminNavComponent {
  private localStoreService = inject(LocalStorageService);
  private pageLayoutService = inject(PagelayoutService);
  private router = inject(Router);

  isDropdownOpen = false;
  toggleProfileDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logOut() {
    this.localStoreService.clear();
    this.pageLayoutService.setLayout(IRole.FOUNDER);
    this.router.navigateByUrl('/auth/admin/login');
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { PagelayoutService } from 'src/app/shared/data-access/pagelayout.service';
import { State } from 'src/app/shared/data-access/state/auth';
import { UnsetCurrentUser } from 'src/app/shared/data-access/state/auth/auth.action';
import { IRole } from 'src/app/shared/types';

@Component({
  selector: 'app-investor-nav',
  templateUrl: './investor-nav.component.html',
  styleUrls: ['./investor-nav.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvestorNavComponent {
  constructor(
    private store: Store<State>,
    private router: Router,
    private pageLayout: PagelayoutService
  ) {}

  logOut(): void {
    this.store.dispatch(UnsetCurrentUser());
    this.pageLayout.setLayout(IRole.FOUNDER);
    this.router.navigateByUrl('/auth/investor/login');
  }

  isDropdownOpen = false;
  toggleProfileDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}

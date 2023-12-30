import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PagelayoutService } from 'src/app/shared/data-access/pagelayout.service';
import { State, getCurrentUserData } from 'src/app/shared/data-access/state/auth';
import { UnsetCurrentUser } from 'src/app/shared/data-access/state/auth/auth.action';
import { ICurrentUser } from 'src/app/shared/data-access/state/auth/auth.reducer';
import { IRole } from 'src/app/shared/types';

@Component({
  selector: 'app-investor-nav',
  templateUrl: './investor-nav.component.html',
  styleUrls: ['./investor-nav.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvestorNavComponent {
  currentUser$!: Observable<ICurrentUser>;

  constructor(
    private store: Store<State>,
    private router: Router,
    private pageLayout: PagelayoutService
  ) {
    this.currentUser$ = this.store.select(getCurrentUserData);
  }
  
  logOut(): void {    
    this.router.navigateByUrl('/founder/ideas');
    this.store.dispatch(UnsetCurrentUser());
    this.pageLayout.setLayout(IRole.FOUNDER);
  }

  isDropdownOpen = false;
  toggleProfileDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}

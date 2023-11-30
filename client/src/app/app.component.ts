import { Component, inject } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { CheckLocalStorageAction } from './shared/data-access/state/auth/auth.action';
import { PagelayoutService } from './shared/data-access/pagelayout.service';
import { IRole } from './shared/types';
import { JwtService } from './shared/data-access/jwt.service';
import { State } from './shared/data-access/state/auth';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private store = inject(Store<State>);
  readonly jwtService = inject(JwtService);
  readonly pageLayoutService = inject(PagelayoutService);
  readonly IRole = IRole;

  ngOnInit() {
    initFlowbite();
    this.store.dispatch(CheckLocalStorageAction());
  }
}

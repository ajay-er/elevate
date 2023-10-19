import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CurrentPage } from 'src/app/shared/types/currentPage';
import { State } from '../../data-access/state';
import { selectForgotPage } from '../../data-access/state/auth.action';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css'],
})
export class ForgotPassComponent {
  private store = inject(Store<State>);

  selectPage(page: CurrentPage) {
    this.store.dispatch(selectForgotPage({ currentAuthPage: page }));
  }
}

import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { initFlowbite } from 'flowbite';
import { State } from './shared/data-access/state/auth';
import { CheckLocalStorageAction } from './shared/data-access/state/auth/auth.action';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private store = inject(Store<State>);

  ngOnInit() {
    initFlowbite();
    
    //checking user logged in or not
    this.store.dispatch(CheckLocalStorageAction());
  }
}

import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State, getCurrentUserData, isInvestorLoggedIn } from 'src/app/shared/data-access/state/auth';
import { ICurrentUser } from 'src/app/shared/data-access/state/auth/auth.reducer';

@Component({
  selector: 'app-create-idea',
  templateUrl: './create-idea.component.html',
  styleUrls: ['./create-idea.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateIdeaComponent {
  @Output() createIdea  = new EventEmitter<any>();
  isInvestorLoggedIn$!: Observable<boolean>;
  user$!: Observable<ICurrentUser>;
  private store = inject(Store<State>);
  caption:string = '';

  ngOnInit() {
    this.isInvestorLoggedIn$ = this.store.select(isInvestorLoggedIn);
    this.user$ = this.store.select(getCurrentUserData);
  }

  post() {
    if (this.caption !== '') {
      this.createIdea.emit(this.caption);
    }
    this.caption = '';
  }
}

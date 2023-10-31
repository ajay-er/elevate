import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { ProfileTab } from 'src/app/shared/types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  protected SelectTab: typeof ProfileTab = ProfileTab;
  @Output() toggleEditBtn = new EventEmitter<any>();
  
  toogleEditButton(tab: ProfileTab) {
    this.toggleEditBtn.emit(tab);
  }
}

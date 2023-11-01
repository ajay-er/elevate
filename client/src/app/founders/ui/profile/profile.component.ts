import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IUserProfile } from 'src/app/shared/interfaces';
import { ProfileTab } from 'src/app/shared/types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  protected SelectTab: typeof ProfileTab = ProfileTab;
  @Output() toggleEditBtn = new EventEmitter<ProfileTab>();
  @Input() userData!: IUserProfile;

  toogleEditButton(tab: ProfileTab) {
    this.toggleEditBtn.emit(tab);
  }
}

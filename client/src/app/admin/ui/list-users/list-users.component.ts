import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListUsersComponent {

}

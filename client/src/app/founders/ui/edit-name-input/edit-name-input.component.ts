import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-edit-name-input',
  templateUrl: './edit-name-input.component.html',
  styleUrls: ['./edit-name-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditNameInputComponent {}

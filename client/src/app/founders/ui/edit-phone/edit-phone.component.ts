import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-phone-input',
  templateUrl: './edit-phone.component.html',
  styleUrls: ['./edit-phone.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPhoneComponent {}

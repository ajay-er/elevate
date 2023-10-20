import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-tab',
  templateUrl: './auth-tab.component.html',
  styleUrls: ['./auth-tab.component.css']
})
export class AuthTabComponent {
  @Input() active = false;

}

import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { SpinnerService } from './shared/data-access/spinner.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private s: SpinnerService) {}
  ngOnInit() {
    initFlowbite();
  }
}

import { Injectable, inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private spinner = inject(NgxSpinnerService);

  startSpin() {
    this.spinner.show();
  }

  endSpin() {
    this.spinner.hide();
  }

  spinThreeSeconds() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }
}

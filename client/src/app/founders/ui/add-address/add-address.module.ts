import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAddressComponent } from './add-address.component';
import { LoadingButtonModule } from 'src/app/shared/ui/loading-button/loading-button.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddAddressComponent],
  imports: [CommonModule, LoadingButtonModule, FormsModule],
  exports: [AddAddressComponent],
})
export class AddAddressModule {}

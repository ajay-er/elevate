import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditPhoneComponent } from './edit-phone.component';
import { LoadingButtonModule } from 'src/app/shared/ui/loading-button/loading-button.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [EditPhoneComponent],
  imports: [CommonModule, LoadingButtonModule, FormsModule],
  exports: [EditPhoneComponent],
})
export class EditPhoneModule {}

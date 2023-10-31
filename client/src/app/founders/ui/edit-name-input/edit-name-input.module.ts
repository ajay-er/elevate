import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditNameInputComponent } from './edit-name-input.component';
import { LoadingButtonModule } from 'src/app/shared/ui/loading-button/loading-button.module';

@NgModule({
  declarations: [EditNameInputComponent],
  imports: [CommonModule, LoadingButtonModule],
  exports: [EditNameInputComponent],
})
export class EditNameInputModule {}

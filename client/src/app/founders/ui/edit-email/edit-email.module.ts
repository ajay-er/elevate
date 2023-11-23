import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditEmailComponent } from './edit-email.component';
import { LoadingButtonModule } from 'src/app/shared/ui/loading-button/loading-button.module';

@NgModule({
  declarations: [EditEmailComponent],
  imports: [CommonModule,LoadingButtonModule],
  exports: [EditEmailComponent],
})
export class EditEmailModule {}

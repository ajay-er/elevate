import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateProfileComponent } from './update-profile.component';
import { LoadingButtonModule } from 'src/app/shared/ui/loading-button/loading-button.module';

@NgModule({
  declarations: [UpdateProfileComponent],
  imports: [CommonModule, LoadingButtonModule],
  exports: [UpdateProfileComponent],
})
export class UpdateProfileModule {}

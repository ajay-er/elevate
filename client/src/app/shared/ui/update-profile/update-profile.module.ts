import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateProfileComponent } from './update-profile.component';
import { LoadingButtonModule } from 'src/app/shared/ui/loading-button/loading-button.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UpdateProfileComponent],
  imports: [CommonModule, LoadingButtonModule,ReactiveFormsModule],
  exports: [UpdateProfileComponent],
})
export class UpdateProfileModule {}

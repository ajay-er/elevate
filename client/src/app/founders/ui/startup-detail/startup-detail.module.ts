import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartupDetailComponent } from './startup-detail.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [StartupDetailComponent],
  imports: [CommonModule,FormsModule],
  exports:[StartupDetailComponent]
})
export class StartupDetailModule {}

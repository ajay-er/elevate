import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdeaDetailComponent } from './idea-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [IdeaDetailComponent],
  imports: [CommonModule,RouterModule],
  exports: [IdeaDetailComponent],
})
export class IdeaDetailModule {}

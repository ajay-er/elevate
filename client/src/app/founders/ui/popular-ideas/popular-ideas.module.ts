import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopularIdeasComponent } from './popular-ideas.component';

@NgModule({
  declarations: [PopularIdeasComponent],
  imports: [CommonModule],
  exports:[PopularIdeasComponent]
})

export class PopularIdeasModule {}

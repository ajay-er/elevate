import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateIdeaComponent } from './create-idea.component';

@NgModule({
  declarations: [CreateIdeaComponent],
  imports: [CommonModule],
  exports:[CreateIdeaComponent]
})
export class CreateIdeaModule {}

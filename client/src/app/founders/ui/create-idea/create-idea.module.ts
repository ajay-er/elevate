import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateIdeaComponent } from './create-idea.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateIdeaComponent],
  imports: [CommonModule,FormsModule],
  exports:[CreateIdeaComponent]
})
export class CreateIdeaModule {}

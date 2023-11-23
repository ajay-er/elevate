import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdeaDetailsRoutingModule } from './idea-details-routing.module';
import { IdeaComponent } from './idea.component';


@NgModule({
  declarations: [
    IdeaComponent
  ],
  imports: [
    CommonModule,
    IdeaDetailsRoutingModule
  ]
})
export class IdeaDetailsModule { }

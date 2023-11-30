import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdeasRoutingModule } from './ideas-routing.module';
import { IdeasComponent } from './ideas.component';
import { CreateIdeaModule } from '../../ui/create-idea/create-idea.module';
import { IdeaDetailModule } from '../../ui/idea-detail/idea-detail.module';
import { PopularIdeasModule } from '../../ui/popular-ideas/popular-ideas.module';

@NgModule({
  declarations: [IdeasComponent],
  imports: [
    CommonModule,
    IdeasRoutingModule,
    CreateIdeaModule,
    IdeaDetailModule,
    PopularIdeasModule
  ],
})
export class IdeasModule {}

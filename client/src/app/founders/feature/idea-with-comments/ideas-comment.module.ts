import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdeasCommentComponent } from './ideas-comment.component';
import { CreateIdeaModule } from '../../ui/create-idea/create-idea.module';
import { IdeaDetailModule } from '../../ui/idea-detail/idea-detail.module';
import { PopularIdeasModule } from '../../ui/popular-ideas/popular-ideas.module';
import { IdeasCommentsRoutingModule } from './ideas-comment-routing.module';
import { IdeaCommentComponent } from '../../ui/idea-comment/idea-comment.component';

@NgModule({
  declarations: [IdeasCommentComponent],
  imports: [
    CommonModule,
    IdeasCommentsRoutingModule,
    CreateIdeaModule,
    IdeaDetailModule,
    PopularIdeasModule,
    IdeaCommentComponent
  ],
})
export class IdeasCommentsModule {}

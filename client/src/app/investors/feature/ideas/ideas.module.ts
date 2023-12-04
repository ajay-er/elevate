import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdeasRoutingModule } from './ideas-routing.module';
import { IdeasComponent } from './ideas.component';
import { IdeaDetailModule } from '../../ui/idea-detail/idea-detail.module';
import { CreateIdeaModule } from '../../ui/create-idea/create-idea.module';
import { ModalModule } from 'src/app/shared/ui/modal/modal.module';
import { FormsModule } from '@angular/forms';
import { LoadingButtonModule } from 'src/app/shared/ui/loading-button/loading-button.module';

@NgModule({
  declarations: [IdeasComponent],
  imports: [
    CommonModule,
    IdeasRoutingModule,
    IdeaDetailModule,
    CreateIdeaModule,
    ModalModule,LoadingButtonModule,
    FormsModule
  ],
})
export class IdeasModule {}

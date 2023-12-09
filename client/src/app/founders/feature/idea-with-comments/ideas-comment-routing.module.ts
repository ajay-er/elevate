import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdeasCommentComponent } from './ideas-comment.component';

const routes: Routes = [{
  path:'',
  component:IdeasCommentComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdeasCommentsRoutingModule { }

import { Component, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IdeaService } from 'src/app/shared/data-access/idea.service';
import { State, isFounderLoggedIn } from 'src/app/shared/data-access/state/auth';
import { IIdea } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas-comment.component.html',
})
export class IdeasCommentComponent {
  isFounderLoggedIn$!: Observable<boolean>;

  constructor(private store: Store<State>,private router:Router) {
    this.isFounderLoggedIn$ = this.store.select(isFounderLoggedIn);
  }

  readonly ideaService = inject(IdeaService);
  readonly route = inject(ActivatedRoute);
  protected idea!: IIdea;
  comment:string = '';

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];      
      this.ideaService.fetchCurrentIdea(id).subscribe((res:any) => {
        console.log(res);
        this.idea = res.idea;
      });
    });
    
  }

  value(e:any) {
    this.comment = e;
    console.log(e);
    
  }

  addComment(ideaId:any) {
    this.ideaService.addComment(this.comment,ideaId).subscribe((res) => {
      console.log(res);
      this.comment = '';
    });
  }

  like(idea:any) {
    this.ideaService.like(idea).subscribe((res) => {
      console.log(res);
      
    });
  }

  dislike(idea:any) {
    this.ideaService.dislike(idea).subscribe((res) => {
      console.log(res);
    });
  }
}

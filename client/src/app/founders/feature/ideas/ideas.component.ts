import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IdeaService } from 'src/app/shared/data-access/idea.service';
import { State, isFounderLoggedIn } from 'src/app/shared/data-access/state/auth';
import { IIdea } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.css']
})
export class IdeasComponent {
  isFounderLoggedIn$!: Observable<boolean>;

  constructor(private store: Store<State>,private router:Router) {
    this.isFounderLoggedIn$ = this.store.select(isFounderLoggedIn);
  }

  readonly ideaService = inject(IdeaService);
  protected ideas: IIdea[] = [];
  comment:string = '';

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.ideaService.getAllIdeas().subscribe((res:any) => {
      this.ideas = res.ideas;
    });
  }
  createIdea(caption:any) {
    this.ideaService.createIdea(caption).subscribe((res:any) => {
      this.ideas.unshift(res.idea);
    });
  }

  ideaSelected(ideaId: any) {
    this.ideaService.fetchCurrentIdea(ideaId).subscribe((res:any) => {   
      const idea = res.idea;
      this.router.navigateByUrl(`/founder/idea/${idea.id}`);
    });
  }

  addComment(ideaId:any) {
    this.ideaService.addComment(this.comment,ideaId).subscribe((res) => {
      console.log(res);
      this.comment = '';
      this.fetchData();
    });
  }

  like(idea: any) {
    this.ideaService.like(idea).subscribe((res: any) => {
      console.log(res);
      this.fetchData();
    });
  }
  
  dislike(idea: any) {
    this.ideaService.dislike(idea).subscribe((res: any) => {
      console.log(res);
      this.fetchData();
    });
  }
}

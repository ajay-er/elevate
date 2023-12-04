import { Component, inject } from '@angular/core';
import { IdeaService } from 'src/app/shared/data-access/idea.service';
import { IIdea } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.css']
})
export class IdeasComponent {
  readonly ideaService = inject(IdeaService);
  protected ideas: IIdea[] = [];
  selectedIdea: IIdea | null = null;
  comment:string = '';

  ngOnInit() {
    this.ideaService.getAllIdeas().subscribe((res:any) => {
      this.ideas = res.ideas;
    });
  }

  idea(caption:any) {
    this.ideaService.createIdea(caption).subscribe((res:any) => {
      this.ideas.unshift(res.idea);
    });
  }

  ideaSelected(ideaId: any) {
    this.ideaService.fetchCurrentIdea(ideaId).subscribe((res:any) => {   
      
      this.selectedIdea = res.idea;
      console.log(this.selectedIdea);
    });
  }

  closeModal(): void {
    this.selectedIdea = null;
  }


  addComment(ideaId:any) {
    this.ideaService.addComment(this.comment,ideaId).subscribe((res) => {
      console.log(res);
      this.comment = '';
      this.selectedIdea = null;
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

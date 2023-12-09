import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IIdea } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-idea-detail',
  templateUrl: './idea-detail.component.html',
  styleUrls: ['./idea-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdeaDetailComponent {
  @Input() idea!:IIdea;
  @Output() ideaselect = new EventEmitter<any>;
  @Output() like = new EventEmitter<any>;
  @Output() dislike = new EventEmitter<any>;

  openIdea(id:string) {
    this.ideaselect.emit(id);
  }

  addLike(ideaId:string) {
    this.like.emit(ideaId);
  }

  addDislike(ideaId:string) {
    this.dislike.emit(ideaId);
  }
}

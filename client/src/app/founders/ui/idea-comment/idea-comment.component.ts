import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoadingButtonModule } from 'src/app/shared/ui/loading-button/loading-button.module';

@Component({
  selector: 'app-idea-comment',
  standalone: true,
  imports: [
    CommonModule,
    LoadingButtonModule,
    FormsModule
  ],
  template: `
<div class="sm:flex items-center justify-center p-4">
  <div class="p-4  sm:w-[40%] rounded-lg bg-white bg-opacity-25  shadow-lg">
    <div>
      <div  class="my-6 text-sm cursor-pointer font-normal text-gray-300">
      <div class="my-6 w-full text-sm font-normal text-gray-500">
      <input
      [(ngModel)]="comment"
      rows="1" 
      class="text-grey-darker rounded-lg border border-black w-full"
        placeholder="add comment"
      >
    </div>      </div>
      <div class="flex  gap-2 text-sm font-semibold text-gray-900">
        <div >
            <app-loading-button (click)="addComment()" [buttonClass]="'bg-black text-white px-4 py-2'" [label]="'Add'" ></app-loading-button>
        </div>
      </div>
    </div>
  </div>
</div>
<ng-container *ngIf="idea">
<ng-container *ngFor="let comment of idea.comments">
<div class="sm:flex items-center justify-center p-4">
  <div class="p-2 flex sm:w-[40%] rounded-lg bg-white bg-opacity-25  shadow-lg">
    <div>
    <div class="flex items-center">
        <img
          class="mr-2 h-6 w-6 rounded-full object-cover"
          [src]="comment?.user?.profileImgUrl"
          alt="profile"
        />
          <p class="font-semibold text-sm text-white-900">{{comment?.user?.firstName}}</p>
      </div>
      <div  class="my-2 ml-2 text-sm cursor-pointer font-normal text-gray-300">
        {{comment.text}}
      </div>
    </div>
  </div>
</div>
</ng-container>
</ng-container>
  `,
  styleUrls: ['./idea-comment.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdeaCommentComponent { 
    @Input() idea:any;
    @Output() commentemit = new EventEmitter();
    comment:string = '';

    addComment() {
      if (this.comment) {
        console.log(this.comment);
        
        const data = {comment:this.comment,ideaId:this.idea.id};
        this.commentemit.emit(data);
        this.comment = '';
      }
    }
}

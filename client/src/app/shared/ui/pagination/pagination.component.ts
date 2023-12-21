import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Output() pageChange = new EventEmitter<number>();

 @Input()
   pageClass:any;

 /** The total number of records */
 @Input()
   collectionSize = 0;

 /** The number of records to display */
 @Input()
   pageSize = 5;

 /** Current page */
 @Input()
   currentPage = 1;

 /** The number of buttons to show either side of the current page */
 @Input()
   maxSize = 2;

 /** Display the First/Last buttons */
 @Input()
   firstLastButtons = false;

 /** Display the Next/Previous buttons */
 @Input()
   nextPreviousButtons = true;

 /** Display small pagination buttons */
 @Input()
   small = false;

 totalPages: any[] = [];

 constructor() {}

 ngOnInit(): void {
   this.totalPages = new Array(Math.ceil(this.collectionSize / this.pageSize));
 }

 ngOnChanges(changes: SimpleChanges) {
   this.totalPages = new Array(Math.ceil(this.collectionSize / this.pageSize));
 }

 /** Set page number */
 selectPageNumber(pageNumber: number) {
   this.currentPage = pageNumber;
   this.pageChange.emit(pageNumber);
 }

 /** Set next page number */
 next() {
   const nextPage = this.currentPage + 1;
   if (nextPage <= this.totalPages.length) {
     this.selectPageNumber(nextPage);
   }
 }

 /** Set previous page number */
 previous() {
   const previousPage = this.currentPage - 1;
   if (previousPage >= 1) {
     this.selectPageNumber(previousPage);
   }
 }
}

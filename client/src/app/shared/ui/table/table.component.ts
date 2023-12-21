import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input() columnArray:any[] = [];
  @Input() gridArray: any[] = [];
  @Input() buttonPresent: boolean = false;
  @Input() actionButtons: boolean = false;

  @Output() onEdit = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() verifyTooglebtn = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Input() buttonConfig: { label: string; action: string; class: string; svg?: string }[] = [];

  edit(item: any) {
    this.onEdit.emit(item);
  }

  toggleBlock(item: any) {
    this.onDelete.emit(item);
  }

  pageChanged(event:any) {
    this.pageChange.emit(event);
  }

  getValue(obj: any, path: string): any {
    const properties = path?.split('.');
    return properties.reduce((prev, curr) => {
      if (prev && typeof prev === 'object' && curr in prev) {
        return prev[curr];
      } else {
        return undefined; 
      }
    }, obj);
  }
}

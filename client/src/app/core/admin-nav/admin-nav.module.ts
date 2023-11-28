import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminNavComponent } from './admin-nav.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AdminNavComponent],
  imports: [CommonModule,RouterModule],
  exports:[AdminNavComponent]
})
export class AdminNavModule {}

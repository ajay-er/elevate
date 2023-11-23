import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminNavComponent } from "./admin-nav.component";

@NgModule({
  declarations: [AdminNavComponent],
  imports: [CommonModule],
  exports:[AdminNavComponent]
})
export class AdminNavModule {}

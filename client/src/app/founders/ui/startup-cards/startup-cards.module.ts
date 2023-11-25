import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartupCardsComponent } from './startup-cards.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [StartupCardsComponent],
  imports: [CommonModule,RouterModule],
  exports:[StartupCardsComponent]
})
export class StartupCardsModule {}

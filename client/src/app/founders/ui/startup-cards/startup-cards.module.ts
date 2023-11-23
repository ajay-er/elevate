import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartupCardsComponent } from './startup-cards.component';

@NgModule({
  declarations: [StartupCardsComponent],
  imports: [CommonModule],
  exports:[StartupCardsComponent]
})
export class StartupCardsModule {}

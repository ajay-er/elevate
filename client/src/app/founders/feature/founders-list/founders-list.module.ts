import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoundersListRoutingModule } from './founders-list-routing.module';
import { FoundersListComponent } from './founders-list.component';
import { StartupCardsModule } from '../../ui/startup-cards/startup-cards.module';

@NgModule({
  declarations: [FoundersListComponent],
  imports: [CommonModule, FoundersListRoutingModule, StartupCardsModule],
})
export class FoundersListModule {}

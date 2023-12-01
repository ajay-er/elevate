import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditFounderRoutingModule } from './edit-founder-routing.module';
import { EditFounderComponent } from './edit-founder.component';
import { LoadingButtonModule } from 'src/app/shared/ui/loading-button/loading-button.module';


@NgModule({
  declarations: [
    EditFounderComponent
  ],
  imports: [
    CommonModule,
    EditFounderRoutingModule,LoadingButtonModule
  ]
})
export class EditFounderModule { }

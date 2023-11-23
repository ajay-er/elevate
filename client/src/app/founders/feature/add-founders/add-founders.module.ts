import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddFoundersRoutingModule } from './add-founders-routing.module';
import { AddFoundersComponent } from './add-founders.component';
import { AddFounderFormModule } from '../../ui/add-founder-form/add-founder-form.module';


@NgModule({
  declarations: [
    AddFoundersComponent
  ],
  imports: [
    CommonModule,
    AddFounderFormModule,
    AddFoundersRoutingModule
  ]
})
export class AddFoundersModule { }

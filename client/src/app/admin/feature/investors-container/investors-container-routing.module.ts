import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvestorsContainerComponent } from './investors-container.component';

const routes: Routes = [
  {
    path: '',
    component: InvestorsContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestorsContainerRoutingModule {}

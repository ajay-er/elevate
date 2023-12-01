import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditInvestorComponent } from './edit-investor.component';
import { UpdateProfileComponent } from 'src/app/shared/ui/update-profile/update-profile.component';

const routes: Routes = [
  {
    path: '',
    component: EditInvestorComponent,
    children: [
      {
        path: 'details',
        component: UpdateProfileComponent,
      },
      {
        path: '',
        redirectTo: 'details',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditInvestorRoutingModule {}

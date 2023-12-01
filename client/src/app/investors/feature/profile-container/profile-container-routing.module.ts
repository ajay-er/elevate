import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileContainerComponent } from './profile-container.component';
import { UpdateProfileComponent } from '../../../shared/ui/update-profile/update-profile.component';
import { UpdateImageComponent } from 'src/app/shared/ui/update-image/update-image.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileContainerComponent,
    children: [
      {
        path: 'details',
        component: UpdateProfileComponent,
      },
      {
        path: 'picture',
        component: UpdateImageComponent,
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
export class ProfileContainerRoutingModule {}

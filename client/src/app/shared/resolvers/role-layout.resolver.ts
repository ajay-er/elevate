import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IRole } from '../types';
import { inject } from '@angular/core';
import { PagelayoutService } from '../data-access/pagelayout.service';

export const roleLayoutResolver = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<string> | Promise<string> | string => {
  const pageLayoutService = inject(PagelayoutService);
  const layout: IRole =
    route.url.length > 0 ? route.url[0].path === 'investor' ? IRole.INVESTOR : route.url[0].path === 'admin' ? IRole.ADMIN : IRole.FOUNDER : IRole.FOUNDER;
  pageLayoutService.setLayout(layout);
  return layout;
};

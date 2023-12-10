import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import { InvestorsService } from 'src/app/investors/data-access/investors.service';

export const investorProfileResolver: ResolveFn<any> = (route, state) => {
  const investorService = inject(InvestorsService);
  
  const id = route.params['id'];
  return investorService.getInvestorDetails(id);
};

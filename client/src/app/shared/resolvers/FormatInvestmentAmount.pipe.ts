import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appFormatInvestmentAmount',
  standalone: true,
})
export class FormatInvestmentAmountPipe implements PipeTransform {

  transform(value: any): string {
    if (!value) return 'not provided';
    const amounts = value.split('-').map((amount: any) => amount.trim());
    const formattedAmounts = amounts.map((amount:any) => this.formatAmount(Number(amount)));
    return formattedAmounts.join(' - ');
  }

  private formatAmount(amount: number): string {
    const absAmount = Math.abs(amount);

    if (absAmount >= 1e9) {
      const formatted = Math.floor(absAmount / 1e9);
      return `${formatted}b`;
    } else if (absAmount >= 1e6) {
      const formatted = Math.floor(absAmount / 1e6);
      return `${formatted}m`;
    } else if (absAmount >= 1e3) {
      const formatted = Math.floor(absAmount / 1e3);
      return `${formatted}k`;
    } else {
      return `${amount}`;
    }
  }
}

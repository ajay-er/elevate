import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appAddOneMonth',
  standalone: true,
})
export class AddOneMonthPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    const date = new Date(value);
    date.setMonth(date.getMonth() + 1);

    return date.toISOString();
  }
}

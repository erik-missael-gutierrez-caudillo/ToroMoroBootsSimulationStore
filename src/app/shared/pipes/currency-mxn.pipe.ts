import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyMxn',
  standalone: true
})
export class CurrencyMxnPipe implements PipeTransform {
  transform(value: number): string {
    if (value === null || value === undefined) {
      return '$0.00';
    }
    return `$${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} MXN`;
  }
}

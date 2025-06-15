import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round',
  standalone: true
})
export class RoundPipe implements PipeTransform {

  transform(value: number | null | undefined, decimalPlaces: number = 0): number | null {

    if (value === null || value === undefined || typeof value !== 'number' || isNaN(value)) {
      return null;
    }

    if (decimalPlaces < 0) {
      decimalPlaces = 0
    }

    const factor = Math.pow(10, decimalPlaces);
    return Math.round(value * factor) / factor;
  }

}

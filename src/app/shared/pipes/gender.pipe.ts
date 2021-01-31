import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(gender: string): string {
    if (gender === 'MIXED') {
      return '(Mixed)';
    } else if (gender === 'LADIES') {
      return '(Ladies)';
    } else {
      return '(Gents)';
    }
  }

}

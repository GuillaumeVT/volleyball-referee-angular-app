import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(gender: string): string {
    if (gender === 'MIXED') {
      return 'user.team.mixed-pipe';
    } else if (gender === 'LADIES') {
      return 'user.team.ladies-pipe';
    } else {
      return 'user.team.gents-pipe';
    }
  }

}

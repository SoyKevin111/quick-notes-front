import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitText',
  standalone: true
})
export class LimitTextPipe implements PipeTransform {

  transform(value: string, limit: number): string {
    if (!value) return '';
    return value.length > limit ? value.slice(0, limit) + '...' : value;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(str: string, length = '50'): any {
    const len = +length;
    const end = (str.length > len) ? '...' : '';
    return `${str.substr(0, len)}${end}`;
  }

}

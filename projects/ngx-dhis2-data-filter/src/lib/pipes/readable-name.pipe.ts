import { Pipe, PipeTransform } from '@angular/core';
import { capitalize } from 'lodash';

@Pipe({
  name: 'readableName'
})
export class ReadableNamePipe implements PipeTransform {
  transform(name: string): any {
    return capitalize((name || '').replace(/[\.\-_,; ]/g, ' '));
  }
}

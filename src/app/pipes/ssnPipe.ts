import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'ssn'
})
export class SsnPipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

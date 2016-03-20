import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({
  name: 'ssn'
})
export class SsnPipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}

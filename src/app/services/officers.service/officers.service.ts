import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {Officers} from './officers';

@Injectable()
export class OfficersService {
  public officers: Array<any> = [];
  public defaultPhoto: string = 'assets/img/officers/unknown_officer.svg';
  constructor() {
    this.officers = Officers;
    for (let i = 0; i < this.officers.length; i++) {
      let name = this.officers[i].name.replace(/ /g, '_').toLowerCase();
      this.officers[i].photo = 'assets/img/officers/' + name + '.svg'
    }
  }
}

import {Component} from '@angular/core';

import {OfficersService} from '../services/officers.service/officers.service';

@Component({
  selector: 'about',
  providers: [OfficersService],
  template: require('./about.html'),
  styles: [require('./apply.scss')]
})

export class About {
  private officers: Array<any>;
  private defaultPhoto: String;
  constructor(
    private officersService: OfficersService
  ) {
    this.officers = officersService.officers;
    this.defaultPhoto = officersService.defaultPhoto;
  }
}

import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';

@Component({
  selector: 'footer',
  directives: [ROUTER_DIRECTIVES],
  template: require('./footer.html'),
  styles: [require('./footer.scss')]
})

export class Footer {
  private footerLogo: String = 'assets/img/freedom_mortgage_white.svg';
  constructor() {}

  ngOnInit() {}
}

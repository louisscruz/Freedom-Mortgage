import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {RouterActive} from '../directives/router-active';

@Component({
  selector: 'navbar',
  directives: [RouterActive, ROUTER_DIRECTIVES],
  styles: [ require('./navbar.scss') ],
  template: require('./navbar.html')
})
export class Navbar {
  private freedomMortgageLogo: string = 'assets/img/freedom-mortgage-logo.svg';
  private isCollapsed: boolean = true;
  constructor() {}

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  ngOnInit() {
  }
}

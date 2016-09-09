import { Component } from '@angular/core';

@Component({
  selector: 'navbar',
  //directives: [RouterActive, ROUTER_DIRECTIVES],
  styles: [ require('./navbar.scss') ],
  template: require('./navbar.html')
})
export class Navbar {
  private freedomMortgageLogo: string = 'assets/img/freedom_mortgage.svg';
  private isCollapsed: boolean = true;
  private infoDropdown: boolean = true;
  constructor() {}

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleInfoDropdown() {
    this.infoDropdown = !this.infoDropdown;
  }

  ngOnInit() {
  }
}

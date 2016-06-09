import {Component, ViewEncapsulation} from '@angular/core';
import {RouteConfig, Router} from '@angular/router-deprecated';

import {Navbar} from './navbar/navbar';
import {Home} from './home/home';
import {Apply} from './apply/apply';
import {Footer} from './footer/footer.component';

import {RouterActive} from './directives/router-active';

@Component({
  selector: 'app',
  providers: [],
  directives: [Navbar, Footer, RouterActive],
  pipes: [],
  styles: [require('./app.scss')],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="full-height">
      <header>
        <navbar></navbar>
      </header>

      <main>
        <router-outlet></router-outlet>
      </main>
    </div>

    <footer></footer>
  `
})
@RouteConfig([
  { path: '/', component: Home, name: 'Index', useAsDefault: true },
  { path: '/home', component: Home, name: 'Home' },
  {
    path: '/about',
    name: 'About',
    loader: () => require('es6-promise!./about/about')('About')
  }, {
    path: '/contact',
    name: 'Contact',
    loader: () => require('es6-promise!./contact/contact')('Contact')
  }, {
    path: '/apply',
    name: 'Apply',
    component: Apply
  }
])
export class App {
  private reviews: Array<string> = ['test'];

  constructor() {}
}

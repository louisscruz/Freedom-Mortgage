import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app',
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
export class App {
  private reviews: Array<string> = ['test'];

  constructor() {}
}

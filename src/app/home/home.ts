import {Component} from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';

@Component({
  selector: 'home',  // <home></home>
  directives: [],
  pipes: [ ],
  styles: [ require('./home.scss') ],
  template: require('./home.html')
})
export class Home {
  data = { value: '' };
  constructor() {

  }

  ngOnInit() {
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

}

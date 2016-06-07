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
  private testimonials: Array<any>;
  constructor() {
    this.testimonials = [
      {
        title: 'test'
      }
    ];
  }

  ngOnInit() {
  }

}

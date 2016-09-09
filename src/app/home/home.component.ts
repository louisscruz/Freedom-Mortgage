import {Component} from '@angular/core';

@Component({
  selector: 'home',  // <home></home>
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

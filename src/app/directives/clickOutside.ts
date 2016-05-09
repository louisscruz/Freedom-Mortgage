import {Directive,
        Input,
        Output,
        HostListener,
        EventEmitter,
        ElementRef} from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})

export class ClickOutsideDirective {
  private localEvent: any = null;
  @Input('clickOutside') clickOutsideHandler;
  @Output() outside: EventEmitter<any> = new EventEmitter();
  @HostListener('document:click')
  compareEvent(event) {
    console.log('working')
    if (event !== this.localEvent) {
      console.log('clicked outside!')
      this.outside.emit(null);
    }
    this.localEvent = null;
  }

  @HostListener('click')
  trackEvent(event): void {
    this.localEvent = event;
  }

  constructor(private _elementRef: ElementRef) {}

  /*ngOnInit() {
    setTimeout(() => {
      document.addEventListener('click', this.clickOutsideHandler)
    }, 0)
  }*/
  ngOnInit() {
    console.log('inited')
  }

  ngOnDestroy() {
    console.log('destroyed')
  }
}

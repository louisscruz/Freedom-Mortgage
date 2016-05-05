import {Directive,
        Input,
        Output,
        HostListener,
        EventEmitter,
        ElementRef} from '@angular/core';

@Directive({
  selector: 'clickOutside'
})

export class ClickOutsideDirective {
  private localEvent: any = null;
  @Input('clickOutside') clickOutsideHandler;
  @Output() clickOutside: EventEmitter<any> = new EventEmitter();
  @HostListener('document:click')
  compareEvent(event) {
    if (event !== this.localEvent) {
      this.clickOutside.emit(null);
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

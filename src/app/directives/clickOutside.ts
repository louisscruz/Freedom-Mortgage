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
  @Input() clickOutside;
  @Output() outside: EventEmitter<any> = new EventEmitter();
  private localEvent: any = null;
  @HostListener('document:click')
  compareEvent(event) {
    if (event !== this.localEvent) {
      this.outside.emit(null);
    }
    this.localEvent = null;
  }

  @HostListener('click')
  trackEvent(event): void {
    this.localEvent = event;
  }
  constructor(private _elementRef: ElementRef) {}
}

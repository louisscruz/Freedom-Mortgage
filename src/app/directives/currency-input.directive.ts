import {Directive, ElementRef, Renderer, Input} from '@angular/core';

@Directive({
    selector: '[currencyInput]'
})
export class CurrencyInputDirective {
  constructor(el: ElementRef, renderer: Renderer) {
    renderer.setElementAttribute(el.nativeElement, 'pattern', '[0-9]*$');
  }
}

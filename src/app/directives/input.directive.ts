import {Directive, ElementRef, Renderer, Input} from '@angular/core';

@Directive({
    selector: 'input[type=text]:not([noBootstrap]), input[type=number]:not([noBootstrap]), textarea:not([noBootstrap])'
})
export class BootstrapInputDirective {
  constructor(el: ElementRef, renderer: Renderer) {
    renderer.setElementClass(el.nativeElement, 'form-control', true);
  }
}

import {Directive, ElementRef, Renderer, Input} from '@angular/core';

@Directive({
    /* tslint:disable:max-line-length */
    selector: 'input[type=text]:not([noBootstrap]), input[type=number]:not([noBootstrap]), textarea:not([noBootstrap])'
    /* tslint:enable:max-line-length */
})
export class BootstrapInputDirective {
  constructor(el: ElementRef, renderer: Renderer) {
    renderer.setElementClass(el.nativeElement, 'form-control', true);
  }
}

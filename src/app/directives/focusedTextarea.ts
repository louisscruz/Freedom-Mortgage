import {Directive, Renderer, ElementRef} from 'angular2/core';
@Directive({
  selector: 'textarea'
})
export class focusedTextarea {
  constructor(public renderer: Renderer, public elementRef: ElementRef) {}

  ngOnInit() {
    this.renderer.invokeElementMethod(this.elementRef.nativeElement, 'focus', []);
  }
}

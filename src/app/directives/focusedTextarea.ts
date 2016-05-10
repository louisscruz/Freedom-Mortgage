import {Directive, Renderer, ElementRef} from '@angular/core';
@Directive({
  selector: 'textarea'
})
export class FocusedTextarea {
  constructor(public renderer: Renderer, public elementRef: ElementRef) {}

  ngOnInit() {
    this.renderer.invokeElementMethod(this.elementRef.nativeElement, 'focus', []);
  }
}

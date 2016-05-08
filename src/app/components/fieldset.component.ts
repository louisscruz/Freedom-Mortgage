import {isPresent} from '@angular/core/src/facade/lang';
import {
  Component,
  ContentChild,
  Attribute,
  ElementRef,
  Renderer,
  Optional,
  Input,
  TemplateRef,
  HostBinding
} from '@angular/core';
import {Control, NgFormControl} from '@angular/common';

import {BootstrapInputDirective} from '../directives/input.directive';

/**
* RouterActive dynamically finds the first element with routerLink and toggles the active class
*
* ## Use
*
* ```
* <li router-active="active"><a [routerLink]=" ['/Home'] ">Home</a></li>
* <li [routerActive]=" activeStringValue "><a [routerLink]=" ['/Home'] ">Home</a></li>
* ```
*/
@Component({
  selector: 'fieldset',
  directives: [BootstrapInputDirective],
  //providers: [TemplateRef],
  template: `
    <label class="form-control-label">{{label}}</label>
    <ng-content></ng-content>
    <div *ngIf="state.touched" class="text-help">
      <template ngFor let-error [ngForOf]="errors">
        <div *ngIf="state.errors && state.errors[error.type]">{{error.message || label + ' Required'}}</div>
      </template>
    </div>
  `
})
export class FieldsetComponent {
  //private errors: Array<Object>;

  constructor(public el: ElementRef, public renderer: Renderer) {
    //renderer.setElementClass(el.nativeElement, 'form-control', true);
    console.log(this.errors);
  }

  @Input()
  label: string;

  @Input()
  noSuccess: boolean;

  @ContentChild(NgFormControl) state;

  @Input() errors: Array<{type: string, message?: string}>;

  @HostBinding('class.has-danger')
  get throwDanger(): boolean {
    if (this.state && (!this.state.valid && this.state.touched)) {
      return true;
    }
  }

  @HostBinding('class.has-success')
  get throwSuccess(): boolean {
    if (this.state && !this.noSuccess) {
      return (this.state.valid && this.state.touched);
    }
  }
}

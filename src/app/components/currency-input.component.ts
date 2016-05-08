import {isPresent} from '@angular/core/src/facade/lang';
import {
  Component,
  ContentChild,
  Attribute,
  ElementRef,
  Renderer,
  Optional,
  Input,
  HostBinding,
  provide
} from '@angular/core';
import {NgFormControl, NgControl, FORM_DIRECTIVES} from '@angular/common';

@Component({
  selector: 'currency-input',
  providers: [FORM_DIRECTIVES, NgFormControl, NgControl],
  template: `
  <label class="form-control-label">{{label}}</label>
  <div class="input-group">
    <span class="input-group-addon">$</span>
    <!--input type="text" class="form-control"-->
    <ng-content></ng-content>
  </div>
  <div class="text-help">Test</div>
  {{status}}
  `
})
export class CurrencyInputComponent {
  @ContentChild(NgFormControl) control;

  @Input() status: boolean;

  /*@Input()
  label: string;

  @ContentChild(NgFormControl) state;

  @HostBinding('class.has-danger')
  get throwDanger(): boolean {
    if (this.state && (!this.state.valid && this.state.touched)) {
      return true;
    }
  }

  @HostBinding('class.has-success')
  get throwSuccess(): boolean {
    if (this.state) {
      return (this.state.valid && this.state.touched);
    }
  }*/
}

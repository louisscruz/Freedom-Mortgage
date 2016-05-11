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
import {FORM_DIRECTIVES, NgFormControl} from '@angular/common';
import {BootstrapInputDirective} from '../directives/input.directive';

@Component({
  selector: 'fieldset',
  directives: [BootstrapInputDirective, FORM_DIRECTIVES, NgFormControl],
  /* tslint:disable:max-line-length */
  template: `
    <label class="form-control-label">{{label}}</label>
    <ng-content></ng-content>
    <div *ngIf="state.touched" class="text-help">
      <template ngFor let-error [ngForOf]="errors">
        <div *ngIf="state.errors && state.errors[error.type]">{{error.message || label + ' Required'}}</div>
      </template>
    </div>
  `
  /* tslint:enable:max-line-length */
})
export class FieldsetComponent {
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

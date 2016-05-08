import {
  Component,
  ContentChild,
  Input,
  HostBinding
} from '@angular/core';
import {Control, NgFormControl} from '@angular/common';

@Component({
  selector: 'fieldset',
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
  @Input()
  label: string;

  @Input()
  noSuccess: boolean;

  @ContentChild(NgFormControl)
  state: NgFormControl;

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

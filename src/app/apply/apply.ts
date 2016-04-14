import {Component} from 'angular2/core';
import {CORE_DIRECTIVES,
        FORM_DIRECTIVES,
        FormBuilder,
        ControlGroup,
        ControlArray,
        Validators,
        AbstractControl,
        Control} from 'angular2/common';
import {States} from './states';

@Component({
  selector: 'apply',
  directives: [],
  providers: [],
  styles: [require('./apply.scss')],
  template: require('./apply.html')
})
export class Apply {
  private applyForm: ControlGroup;

  constructor() {
    this.applyForm = this.generateForm();
    console.log(this.applyForm);
    console.log(this.applyForm);
  }

  generateForm() {
    const applyForm = new ControlGroup({});
    const borrowerGroup = new ControlGroup({});
    borrowerGroup.addControl('firstName', new Control('', Validators.required));
    borrowerGroup.addControl('middleName', new Control());
    applyForm.addControl('borrowerGroup', borrowerGroup);
    return applyForm;
  }

  toggleCoborrower() {
    if (this.applyForm.controls['coborrowerInfoGroup']) {
      this.applyForm.removeControl('coborrowerInfoGroup');
    } else {
      const coborrowerInfoGroup = new ControlGroup({});
      coborrowerInfoGroup.addControl('firstName', new Control());
      this.applyForm.addControl('coborrowerInfoGroup', coborrowerInfoGroup);
    }
  }
}

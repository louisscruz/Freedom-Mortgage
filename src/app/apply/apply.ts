import {Component} from 'angular2/core';
import {CORE_DIRECTIVES,
        FORM_DIRECTIVES,
        FormBuilder,
        ControlGroup,
        Validators,
        AbstractControl,
        Control} from 'angular2/common';

@Component({
  selector: 'apply',
  directives: [],
  styles: [require('./apply.scss')],
  template: require('./apply.html')
})
export class Apply {
  private applyForm: ControlGroup;
  private firstName: AbstractControl;
  private middleName: AbstractControl;
  private noMiddleName: boolean = false;
  private middleNameCache: string;
  private lastName: AbstractControl;
  constructor(private _fb: FormBuilder) {
    /*function middleNameRequired(control: Control): { [s: string]: boolean } {
      console.log(this.noMiddleName);
      if (!control.value && this.noMiddleName) {
        return { middleNameRequired: true }
      }
    }*/
    /*function middleNameRequired(middleName: string, noMiddleName: boolean) {
      return (group: ControlGroup): {[key: string]: any} => {
        let noMiddleName = this.noMiddleName;
        if (!noMiddleName && !middleName) {
          return {missingMiddleName: true}
        }
      }
    }*/
    this.applyForm = _fb.group({
      'firstName': ['', Validators.compose([
        Validators.required
      ])],
      'middleName': ['', Validators.compose([
        Validators.required
      ])],
      'lastName': ['', Validators.compose([
        Validators.required
      ])]
    });
    this.firstName = this.applyForm.controls['firstName'];
    this.middleName = this.applyForm.controls['middleName'];
    this.lastName = this.applyForm.controls['lastName'];
  }

  toggleMiddleNameValue(): void {
    if (!this.noMiddleName) {
      this.middleNameCache = this.applyForm.controls['middleName'].value;
      (this.applyForm.controls['middleName'] as Control).updateValue('');
    } else {
      (this.applyForm.controls['middleName'] as Control).updateValue(this.middleNameCache);
    }
  }

  ngOnInit() {}

}

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
  private borrowerDob: AbstractControl;
  private borrowerSsn: AbstractControl;
  private maritalStatus: AbstractControl;
  private coborrower: boolean = false;
  private coborrowerFirstName: AbstractControl;
  private coborrowerMiddleName: AbstractControl;
  private coborrowerLastName: AbstractControl;

  private loanAmount: number = 250000;

  private dec1: AbstractControl;
  private dec1b: AbstractControl;
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
    //function conditionalRequired(field: string)
    this.applyForm = _fb.group({
      'firstName': ['', Validators.compose([
        Validators.required
      ])],
      'middleName': ['', Validators.compose([
        Validators.required
      ])],
      'lastName': ['', Validators.compose([
        Validators.required
      ])],
      'borrowerDob': ['', Validators.compose([
        Validators.required
      ])],
      'borrowerSsn': ['', Validators.compose([
        Validators.required
      ])],
      'maritalStatus': ['', Validators.compose([
        Validators.required
      ])],
      'coborrowerFirstName': ['', Validators.compose([
        Validators.required
      ])],
      'coborrowerMiddleName': ['', Validators.compose([
        Validators.required
      ])],
      'coborrowerLastName': ['', Validators.compose([
        Validators.required
      ])],
      'loanAmount': ['', Validators.compose([
        Validators.required
      ])],
      'dec1': ['', Validators.compose([
        Validators.required
      ])],
      'dec1b': ['', Validators.compose([
        Validators.required
      ])]
    });
    this.firstName = this.applyForm.controls['firstName'];
    this.middleName = this.applyForm.controls['middleName'];
    this.lastName = this.applyForm.controls['lastName'];
    this.borrowerDob = this.applyForm.controls['borrowerDob'];
    this.borrowerSsn = this.applyForm.controls['borrowerSsn'];
    this.maritalStatus = this.applyForm.controls['maritalStatus'];
    this.coborrowerFirstName = this.applyForm.controls['coborrowerFirstName'];
    this.coborrowerMiddleName = this.applyForm.controls['coborrowerMiddleName'];
    this.coborrowerLastName = this.applyForm.controls['coborrowerLastName'];
    //this.loanAmount = this.applyForm.controls['loanAmount'];

    this.dec1 = this.applyForm.controls['dec1'];
    this.dec1b = this.applyForm.controls['dec1b'];
  }

  toggleMiddleNameValue(): void {
    if (!this.noMiddleName) {
      this.middleNameCache = this.applyForm.controls['middleName'].value;
      (this.applyForm.controls['middleName'] as Control).updateValue('');
    } else {
      (this.applyForm.controls['middleName'] as Control).updateValue(this.middleNameCache);
    }
  }

  setMaritalStatus(value: string): void {
    (<Control>this.applyForm.controls['maritalStatus']).updateValue(value);
    if (value === 'married') {
      this.setCoborrower(true);
    } else {
      this.setCoborrower(false);
    }
  }

  setCoborrower(value: boolean): void {
    this.coborrower = value;
  }

  setField(field: string, value: any): void {
    (<Control>this.applyForm.controls[field]).updateValue(value);
    console.log(this.applyForm)
  }

  ngOnInit() {}

}

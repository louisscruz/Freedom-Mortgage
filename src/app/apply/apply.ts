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
  private middleNameCache: string;
  private lastName: AbstractControl;
  private borrowerDob: AbstractControl;
  private borrowerSsn: AbstractControl;
  private maritalStatus: AbstractControl;
  private includeCoborrower: AbstractControl;
  private coborrowerFirstName: AbstractControl;
  private coborrowerMiddleName: AbstractControl;
  private coborrowerMiddleNameCache: string;
  private coborrowerLastName: AbstractControl;

  private loanAmount: number = 250000;

  private dec1: AbstractControl;
  private dec1b: AbstractControl;

  private noMiddleName: any = {
    value: false
  };

  private coborrower: any = {
    value: false
  };

  private coborrowerMiddleNameExists: any = {
    value: true
  };
  constructor(private _fb: FormBuilder) {
    function conditionalRequired(...conditions: any[]): any {
      //alert('running')
      //setTimeout(() => {
        let necessary = false;
        return (control: Control): { [s: string]: boolean } => {
          //console.log('currently running for the following conditions')
          //console.log(conditions);
          //alert(conditions[0].value)
          for (var i = 0; i < conditions.length; i++) {
            if (conditions[i].value === false) {
              necessary = true;
            }
          }
          if (necessary && (control.value === '' || control.value === null)) {
            return { required: true };
          } else {
            return null;
          }
        };
      //}, 0);
    }

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
      'includeCoborrower': ['', Validators.compose([
        Validators.required
      ])],
      'coborrowerFirstName': ['', Validators.compose([
        conditionalRequired(this.coborrower)
      ])],
      'coborrowerMiddleName': ['', Validators.compose([
        conditionalRequired(this.coborrower, this.coborrowerMiddleNameExists)
      ])],
      'coborrowerLastName': ['', Validators.compose([
        conditionalRequired(this.coborrower)
      ])],
      'loanAmount': ['', Validators.compose([
        Validators.required
      ])],
      'dec1': ['', Validators.compose([
        Validators.required
      ])],
      'dec1b': ['', Validators.compose([
        conditionalRequired(this.coborrower)
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
    if (!this.noMiddleName.value === true) {
      this.middleNameCache = this.applyForm.controls['middleName'].value;
      (this.applyForm.controls['middleName'] as Control).updateValue('');
    } else {
      (this.applyForm.controls['middleName'] as Control).updateValue(this.middleNameCache);
    }
  }

  toggleCoborrowerMiddleName(): void {
    if (this.coborrowerMiddleNameExists.value === true) {
      this.setCondition(this.coborrowerMiddleNameExists, false);
      this.coborrowerMiddleNameCache = this.applyForm.controls['coborrowerMiddleName'].value;
      (this.applyForm.controls['coborrowerMiddleName'] as Control).updateValue('');
    } else {
      this.setCondition(this.coborrowerMiddleNameExists, true);
      (this.applyForm.controls['coborrowerMiddleName'] as Control)
      .updateValue(this.coborrowerMiddleNameCache);
    }
  }

  setMaritalStatus(value: string): void {
    //setTimeout(() => {
      //(<Control>this.applyForm.controls['maritalStatus']).updateValue(value);
      if (value === 'married') {
        //this.setCondition(this.coborrower, true);
        this.coborrower.value = true;
      } else {
        //this.setCondition(this.coborrower, false);
        this.coborrower.value = false;
      }
      (<Control>this.applyForm.controls['maritalStatus']).updateValue(value);

    //}, 0);
  }

  setCoborrowerTrue(value: boolean) {
    if (value === false) {
      this.coborrower = true;
      (<Control>this.applyForm.controls['includeCoborrower']).updateValue(true);

    }
  }

  setCoborrowerFalse(value: boolean) {
    if (value === true) {
      this.coborrower = false;
      (<Control>this.applyForm.controls['includeCoborrower']).updateValue(false);
    }
  }

  setCondition(condition: any, value: boolean): void {
    condition.value = value;
  }

  setField(field: string, value: any): void {
    (<Control>this.applyForm.controls[field]).updateValue(value);
  }

  ngOnInit() {}

}

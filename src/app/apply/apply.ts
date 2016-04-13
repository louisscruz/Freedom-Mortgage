import {Component} from 'angular2/core';
import {CORE_DIRECTIVES,
        FORM_DIRECTIVES,
        FormBuilder,
        ControlGroup,
        Validators,
        AbstractControl,
        Control} from 'angular2/common';
import {MaskDirective} from '../directives/mask';
import {States} from './states';

@Component({
  selector: 'apply',
  directives: [MaskDirective],
  providers: [],
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
  private borrowerPhone: AbstractControl;
  private borrowerEmail: AbstractControl;
  private borrowerStreetAddr: AbstractControl;
  private borrowerCity: AbstractControl;
  private borrowerState: AbstractControl;
  private borrowerZip: AbstractControl;
  private maritalStatus: AbstractControl;
  private includeCoborrower: AbstractControl;
  private coborrowerFirstName: AbstractControl;
  private coborrowerMiddleName: AbstractControl;
  private coborrowerMiddleNameCache: string;
  private coborrowerLastName: AbstractControl;
  private coborrowerDob: AbstractControl;
  private coborrowerSsn: AbstractControl;
  private coborrowerPhone: AbstractControl;
  private coborrowerPhoneSame: boolean = false;
  private coborrowerEmail: AbstractControl;
  private coborrowerEmailSame: boolean = false;
  private coborrowerAddrSame: boolean = true;

  private loanType: string = 'purchase';
  private loanAmount: number = 250000;
  private propertyAddress: AbstractControl;

  private dec1: AbstractControl;
  private coborrowerDec1: AbstractControl;
  private dec2: AbstractControl;
  private coborrowerDec2: AbstractControl;

  private noMiddleName: any = {
    value: false
  };

  private coborrower: any = {
    value: false
  };

  private spouse: any = {
    value: false
  };

  private coborrowerMiddleNameExists: any = {
    value: true
  };

  private sameAddress: any = {
    value: true
  }

  private propertyExists: any = {
    value: false
  };

  public states = States;
  constructor(private _fb: FormBuilder) {
    function emailValidator(control: Control): { [s: string]: boolean } {
      if (!control.value.match(/.+@.+\..+/i) && control.value) {
        return {invalidEmail: true};
      }
    }
    function conditionalRequired(...conditions: any[]): any {
      return (control: Control): { [s: string]: boolean } => {
        for (var i = 0; i < conditions.length; i++) {
          if (conditions[i].value === false) {
            return;
          }
        }
        if (control.value === '' || control.value === null) {
          return { required: true };
        }
      };
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
      'borrowerPhone': ['', Validators.compose([
        Validators.required
      ])],
      'borrowerEmail': ['', Validators.compose([
        Validators.required, emailValidator
      ])],
      'borrowerStreetAddr': ['', Validators.compose([
        Validators.required
      ])],
      'borrowerCity': ['', Validators.compose([
        Validators.required
      ])],
      'borrowerState': ['', Validators.compose([
        Validators.required
      ])],
      'borrowerZip': ['', Validators.compose([
        Validators.required, Validators.minLength(5), Validators.maxLength(5)
      ])],
      'maritalStatus': ['', Validators.compose([
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
      'coborrowerDob': ['', Validators.compose([
        conditionalRequired(this.coborrower)
      ])],
      'coborrowerSsn': ['', Validators.compose([
        conditionalRequired(this.coborrower)
      ])],
      'coborrowerPhone': ['', Validators.compose([
        conditionalRequired(this.coborrower)
      ])],
      'coborrowerEmail': ['', Validators.compose([
        conditionalRequired(this.coborrower), emailValidator
      ])],
      'loanType': ['', Validators.compose([
        Validators.required
      ])],
      'loanAmount': ['', Validators.compose([
        Validators.required
      ])],
      'propertyAddress': ['', Validators.compose([
        conditionalRequired(this.propertyExists)
      ])],
      'dec1': ['', Validators.compose([
        Validators.required
      ])],
      'coborrowerDec1': ['', Validators.compose([
        conditionalRequired(this.coborrower)
      ])],
      'dec2': ['', Validators.compose([
        Validators.required
      ])],
      'coborrowerDec2': ['', Validators.compose([
        conditionalRequired(this.coborrower)
      ])]
    });
    this.firstName = this.applyForm.controls['firstName'];
    this.middleName = this.applyForm.controls['middleName'];
    this.lastName = this.applyForm.controls['lastName'];
    this.borrowerDob = this.applyForm.controls['borrowerDob'];
    this.borrowerSsn = this.applyForm.controls['borrowerSsn'];
    this.borrowerPhone = this.applyForm.controls['borrowerPhone'];
    this.borrowerEmail = this.applyForm.controls['borrowerEmail'];
    this.borrowerStreetAddr = this.applyForm.controls['borrowerStreetAddr'];
    this.borrowerCity = this.applyForm.controls['borrowerCity'];
    this.borrowerState = this.applyForm.controls['borrowerState'];
    this.borrowerZip = this.applyForm.controls['borrowerZip'];
    this.maritalStatus = this.applyForm.controls['maritalStatus'];
    this.coborrowerFirstName = this.applyForm.controls['coborrowerFirstName'];
    this.coborrowerMiddleName = this.applyForm.controls['coborrowerMiddleName'];
    this.coborrowerLastName = this.applyForm.controls['coborrowerLastName'];
    this.coborrowerDob = this.applyForm.controls['coborrowerDob'];
    this.coborrowerSsn = this.applyForm.controls['coborrowerSsn'];
    this.coborrowerPhone = this.applyForm.controls['coborrowerPhone'];
    this.coborrowerEmail = this.applyForm.controls['coborrowerEmail'];

    //this.loanType = this.applyForm.controls['loanType'];
    //this.loanAmount = this.applyForm.controls['loanAmount'];

    this.dec1 = this.applyForm.controls['dec1'];
    this.coborrowerDec1 = this.applyForm.controls['coborrowerDec1'];
    this.dec2 = this.applyForm.controls['dec2'];
    this.coborrowerDec2 = this.applyForm.controls['coborrowerDec2'];
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
    (<Control>this.applyForm.controls['maritalStatus']).updateValue(value);
    if (value === 'married') {
      this.setCoborrower(true);
      this.setSpouse(true);
    } else {
      this.setCoborrower(false);
      this.setSpouse(false);
    }
  }

  setCoborrower(value: boolean) {
    if (value !== this.coborrower.value) {
      this.coborrower.value = !this.coborrower.value;
      for (var key in this.applyForm.controls) {
        if (key.slice(0, 10) === 'coborrower') {
          (this.applyForm.controls[key] as Control).updateValueAndValidity();
        }
      }
    }
  }

  setSpouse(value: boolean): void {
    if (value !== this.spouse.value) {
      this.spouse.value = !this.spouse.value;
    }
  }

  setSamePhone(): void {
    this.coborrowerPhoneSame = !this.coborrowerPhoneSame;
    (this.applyForm.controls['coborrowerPhone'] as Control).updateValue(this.applyForm.controls['borrowerPhone'].value);
  }

  setSameEmail(): void {
    this.coborrowerEmailSame = !this.coborrowerEmailSame;
    (this.applyForm.controls['coborrowerEmail'] as Control).updateValue(this.applyForm.controls['borrowerEmail'].value);
  }

  setSameAddress(value: boolean): void {
    this.sameAddress.value = value;
  }

  setLoanType(value: string): void {
    if (value !== this.loanType) {
      this.loanType = value;
      if (value === 'refinance') {
        this.setPropertyExists(true);
      } else if (this.propertyExists.value) {
        this.setPropertyExists(false);
      }
    }
  }

  setPropertyExists(value: boolean): void {
    if (value !== this.propertyExists.value) {
      this.propertyExists.value = value;
    }
  }

  setCondition(condition: any, value: boolean): void {
    condition.value = value;
  }

  setField(field: string, value: any): void {
    (<Control>this.applyForm.controls[field]).updateValue(value);
  }

  ngOnInit() {}

  get cgValue(): string {
    return JSON.stringify(this.applyForm.value, null, 2)
  }

}

import {Component, ChangeDetectorRef} from 'angular2/core';
import {CORE_DIRECTIVES,
        FORM_DIRECTIVES,
        FormBuilder,
        ControlGroup,
        ControlArray,
        Validators,
        AbstractControl,
        Control} from 'angular2/common';
import {States} from './states';
import {DatePicker} from '../components/datepicker/datepicker';
import {DatePickerService} from '../components/datepicker/datepicker.service';
import {DatePickerPopup} from '../components/datepicker/datepicker-popup';
import {ClickOutsideDirective} from '../directives/clickOutside';

@Component({
  selector: 'apply',
  directives: [DatePicker, DatePickerPopup, ClickOutsideDirective],
  providers: [DatePickerService],
  styles: [require('./apply.scss')],
  template: require('./apply.html')
})
export class Apply {
  private applyForm: ControlGroup;
  private borrowerEmploymentArray: ControlArray;
  private coborrowerEmploymentArray: ControlArray;
  private borrowerDeclarationsArray: ControlArray;
  private coborrowerDeclarationsArray: ControlArray;
  private borrowerMiddleNameCache: string;
  private coborrowerMiddleNameCache: string;
  private borrowerDob: Date;
  private coborrowerDob: Date;
  private borrowerDobOpen: boolean = false;
  private coborrowerDobOpen: boolean = false;
  private states: Array<any> = States;
  private loanMin: number = 50000;
  private loanMax: number = 2500000;
  private abcArray: Array<string>;
  private declarations: Array<Object>;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    this.applyForm = this.generateForm();
    if (sessionStorage.getItem('cachedForm') !== null) {
      console.log(JSON.parse(sessionStorage.getItem('cachedForm')));
    }
    this.applyForm.valueChanges.subscribe(data => {
      //console.log(sessionStorage.getItem('cachedForm'));
      sessionStorage.setItem('cachedForm', JSON.stringify(this.applyForm.value));
      //sessionStorage.setItem('cachedForm', JSON.stringify(this.applyForm));
    });
    this.applyForm.controls['declarationsGroup'].find('borrower').find('l').valueChanges.subscribe(data => {
      if (data === true) {
        (this.applyForm.controls['declarationsGroup'].find('borrower') as ControlGroup).include('m');
      } else {
        (this.applyForm.controls['declarationsGroup'].find('borrower') as ControlGroup).exclude('m');
      }
    });
    this.applyForm.controls['declarationsGroup'].find('coborrower').find('l').valueChanges.subscribe(data => {
      if (data === true) {
        (this.applyForm.controls['declarationsGroup'].find('coborrower') as ControlGroup).include('m');
      } else {
        (this.applyForm.controls['declarationsGroup'].find('borrower') as ControlGroup).exclude('m');
      }
    });
  }

  emailValidator(control: Control): { [s: string]: boolean} {
    if (!control.value.match(/.+@.+\..+/i) && control.value) {
      return {invalidEmail: true};
    }
  }

  zipValidator(control: Control): { [s: string]: boolean} {
    if (control.value && (!control.value.match(/^[0-9]*$/) || control.value.length !== 5)) {
      return {invalidZip: true}
    }
  }

  generateAddress(): ControlGroup {
    const address = new ControlGroup({
      'add': new Control('', Validators.required),
      'city': new Control('', Validators.required),
      'state': new Control('', Validators.required),
      'zip': new Control('', Validators.compose([
        Validators.required, this.zipValidator
      ]))
    });
    return address;
  }

  generateDeclarations(): ControlGroup {
    const dec = new ControlGroup({
      'a': new Control('', Validators.required),
      'b': new Control('', Validators.required),
      'c': new Control('', Validators.required),
      'd': new Control('', Validators.required),
      'e': new Control('', Validators.required),
      'f': new Control('', Validators.required),
      'g': new Control('', Validators.required),
      'h': new Control('', Validators.required),
      'i': new Control('', Validators.required),
      'j': new Control('', Validators.required),
      'k': new Control('', Validators.required),
      'l': new Control('', Validators.required),
      'm': new Control('', Validators.required),
      'm1': new Control('', Validators.required),
      'm2': new Control('', Validators.required)
    });
    dec.exclude('m');
    dec.exclude('m1');
    dec.exclude('m2');
    return dec;
  }

  generateForm() {
    const applyForm = new ControlGroup({});
    const borrowerGroup = new ControlGroup({});
    borrowerGroup.addControl('firstName', new Control('', Validators.required));
    borrowerGroup.addControl('middleName', new Control('', Validators.required));
    borrowerGroup.addControl('lastName', new Control('', Validators.required));
    borrowerGroup.addControl('dob', new Control('', Validators.required));
    borrowerGroup.addControl('phone', new Control('', Validators.required));
    borrowerGroup.addControl('email', new Control('', Validators.compose([
      Validators.required, this.emailValidator
    ])));
    borrowerGroup.addControl('ssn', new Control('', Validators.required));
    const borrowerAddress = this.generateAddress();
    borrowerGroup.addControl('address', borrowerAddress);
    borrowerGroup.addControl('maritalStatus', new Control('', Validators.required));
    applyForm.addControl('borrowerGroup', borrowerGroup);
    const coborrowerGroup = new ControlGroup({});
    coborrowerGroup.addControl('firstName', new Control('', Validators.required));
    coborrowerGroup.addControl('middleName', new Control('', Validators.required));
    coborrowerGroup.addControl('lastName', new Control('', Validators.required));
    coborrowerGroup.addControl('email', new Control('', Validators.compose([
      Validators.required, this.emailValidator
    ])));
    coborrowerGroup.addControl('phone', new Control('', Validators.required));
    coborrowerGroup.addControl('dob', new Control('', Validators.required));
    coborrowerGroup.addControl('ssn', new Control('', Validators.required));
    const coborrowerAddress = this.generateAddress();
    coborrowerGroup.addControl('address', coborrowerAddress);
    coborrowerGroup.exclude('address');
    applyForm.addControl('coborrowerGroup', coborrowerGroup);
    applyForm.exclude('coborrowerGroup');
    const loanGroup = new ControlGroup({});
    loanGroup.addControl('type', new Control('purchase', Validators.required));
    loanGroup.addControl('amount', new Control('250000', Validators.required));
    const propertyAddress = this.generateAddress();
    loanGroup.addControl('address', propertyAddress);
    loanGroup.exclude('address');
    applyForm.addControl('loanGroup', loanGroup);
    const employmentGroup = new ControlGroup({});
    this.borrowerEmploymentArray = new ControlArray([]);
    this.coborrowerEmploymentArray = new ControlArray([]);
    employmentGroup.addControl('borrower', this.borrowerEmploymentArray);
    employmentGroup.addControl('coborrower', this.coborrowerEmploymentArray);
    this.addBorrowerJob();
    this.addCoborrowerJob();
    employmentGroup.exclude('coborrower');
    applyForm.addControl('employmentGroup', employmentGroup);
    const declarationsGroup = new ControlGroup({});
    const borrowerDeclarations = this.generateDeclarations();
    const coborrowerDeclarations = this.generateDeclarations();
    declarationsGroup.addControl('borrower', borrowerDeclarations);
    declarationsGroup.addControl('coborrower', coborrowerDeclarations);
    declarationsGroup.exclude('coborrower');
    applyForm.addControl('declarationsGroup', declarationsGroup);
    return applyForm;
  }

  setMaritalStatus(value: string): void {
    (this.applyForm.controls['borrowerGroup'].find('maritalStatus') as Control).updateValue(value);
    if (value === 'married' && !this.applyForm.contains('coborrowerGroup')) {
      this.addCoborrower();
    }
  }

  toggleBorrowerMiddleName(): void {
    if ((this.applyForm.controls['borrowerGroup'] as ControlGroup).contains('middleName')) {
      this.borrowerMiddleNameCache = this.applyForm.controls['borrowerGroup'].find('middleName').value;
      (this.applyForm.controls['borrowerGroup'] as ControlGroup).exclude('middleName');
      (this.applyForm.controls['borrowerGroup'].find('middleName') as Control).updateValue('');
    } else {
      (this.applyForm.controls['borrowerGroup'] as ControlGroup).include('middleName');
      (this.applyForm.controls['borrowerGroup'].find('middleName') as Control).updateValue(this.borrowerMiddleNameCache);
      this.borrowerMiddleNameCache = '';
    }
  }

  toggleBorrowerDob(): void {
    this.borrowerDobOpen = !this.borrowerDobOpen;
  }

  closeBorrowerDob(): void {
    this.borrowerDobOpen = false;
    (this.applyForm.controls['borrowerGroup'].find('dob') as Control).updateValue(this.borrowerDob);
    this._changeDetectorRef.detectChanges();
  }

  addCoborrower(): void {
    this.applyForm.include('coborrowerGroup');
    (this.applyForm.controls['employmentGroup'] as ControlGroup).include('coborrower');
    (this.applyForm.controls['declarationsGroup'] as ControlGroup).include('coborrower');
    this._changeDetectorRef.detectChanges();
  }

  removeCoborrower(): void {
    this.applyForm.exclude('coborrowerGroup');
    (this.applyForm.controls['employmentGroup'] as ControlGroup).exclude('coborrower');
  }

  toggleCoborrowerMiddleName(): void {
    if ((this.applyForm.controls['coborrowerGroup'] as ControlGroup).contains('middleName')) {
      this.coborrowerMiddleNameCache = this.applyForm.controls['coborrowerGroup'].find('middleName').value;
      (this.applyForm.controls['coborrowerGroup'] as ControlGroup).exclude('middleName');
      (this.applyForm.controls['coborrowerGroup'].find('middleName') as Control).updateValue('');
    } else {
      (this.applyForm.controls['coborrowerGroup'] as ControlGroup).include('middleName');
      (this.applyForm.controls['coborrowerGroup'].find('middleName') as Control).updateValue(this.coborrowerMiddleNameCache);
      this.borrowerMiddleNameCache = '';
    }
  }

  toggleCoborrowerDob(): void {
    this.coborrowerDobOpen = !this.coborrowerDobOpen;
  }

  closeCoborrowerDob(): void {
    this.coborrowerDobOpen = false;
    (this.applyForm.controls['coborrowerGroup'].find('dob') as Control).updateValue(this.coborrowerDob);
    this._changeDetectorRef.detectChanges();
  }

  addCoborrowerAddress(): void {
    (this.applyForm.controls['coborrowerGroup'] as ControlGroup).include('address');
    this._changeDetectorRef.detectChanges();
  }

  removeCoborrowerAddress(): void {
    (this.applyForm.controls['coborrowerGroup'] as ControlGroup).exclude('address');
  }

  setLoanType(type: string): void {
    (this.applyForm.controls['loanGroup'].find('type') as Control).updateValue(type);
    if (type === 'refinance' && !(this.applyForm.controls['loanGroup'] as ControlGroup).contains('address')) {
      this.addProperty();
    }
  }

  setLoanAmount(event: any): void {
    if (event.target.value > this.loanMax) {
      this.loanMax = event.target.value;
    } else if (event.target.value < this.loanMin) {
      this.loanMin = event.target.value;
    }
    (this.applyForm.controls['loanGroup'].find('amount') as Control).updateValue(event.target.value);
  }

  addProperty(): void {
    (this.applyForm.controls['loanGroup'] as ControlGroup).include('address');
    this._changeDetectorRef.detectChanges();
  }

  removeProperty(): void {
    (this.applyForm.controls['loanGroup'] as ControlGroup).exclude('address');
  }

  generateJob(): ControlGroup {
    const job = new ControlGroup({
      'selfEmployed': new Control(false, Validators.required),
      'company': new Control('', Validators.required),
      'address': this.generateAddress(),
      'phone': new Control('', Validators.required),
      'years': new Control('', Validators.required),
      'months': new Control('', Validators.required),
      'yearsInField': new Control('', Validators.required)
    });
    return job;
  }

  addBorrowerJob(): void {
    this.borrowerEmploymentArray.push(this.generateJob());
  }

  addCoborrowerJob(): void {
    this.coborrowerEmploymentArray.push(this.generateJob());
  }

  deleteBorrowerJob(index: number): void {
    this.borrowerEmploymentArray.removeAt(index);
  }

  deleteCoborrowerJob(index: number): void {
    this.coborrowerEmploymentArray.removeAt(index);
  }

  setDeclaration(field: Control, value: any): void {
    field.updateValue(value);
  }

  get afValue(): string {
    return JSON.stringify(this.applyForm.value, null, 2)
  }
}

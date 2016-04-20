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
import {Moment} from 'moment';
import {DatePicker} from '../components/datepicker/datepicker';
import {DatePickerService} from '../components/datepicker/datepicker.service';
import {DatePickerPopup} from '../components/datepicker/datepicker-popup';
import {ClickOutsideDirective} from '../directives/clickOutside';
import * as moment from 'moment';

@Component({
  selector: 'apply',
  directives: [DatePicker, DatePickerPopup, ClickOutsideDirective],
  providers: [DatePickerService],
  styles: [require('./apply.scss')],
  template: require('./apply.html')
})
export class Apply {
  private applyForm: ControlGroup;
  private borrowerMiddleNameCache: string;
  private coborrowerMiddleNameCache: string;
  private borrowerDob: Date;
  private coborrowerDob: Date;
  private borrowerDobOpen: boolean = false;
  private coborrowerDobOpen: boolean = false;
  private states = States;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    this.applyForm = this.generateForm();
  }

  generateForm() {
    const applyForm = new ControlGroup({});
    const borrowerGroup = new ControlGroup({});
    borrowerGroup.addControl('firstName', new Control('', Validators.required));
    borrowerGroup.addControl('middleName', new Control('', Validators.required));
    borrowerGroup.addControl('lastName', new Control('', Validators.required));
    borrowerGroup.addControl('dob', new Control('', Validators.required));
    borrowerGroup.addControl('phone', new Control('', Validators.required));
    borrowerGroup.addControl('email', new Control('', Validators.required));
    borrowerGroup.addControl('ssn', new Control('', Validators.required));
    borrowerGroup.addControl('add', new Control('', Validators.required));
    borrowerGroup.addControl('city', new Control('', Validators.required));
    borrowerGroup.addControl('state', new Control('', Validators.required));
    borrowerGroup.addControl('zip', new Control('', Validators.required));
    borrowerGroup.addControl('maritalStatus', new Control('', Validators.required));
    applyForm.addControl('borrowerGroup', borrowerGroup);
    const coborrowerGroup = new ControlGroup({});
    coborrowerGroup.addControl('firstName', new Control('', Validators.required));
    coborrowerGroup.addControl('middleName', new Control('', Validators.required));
    coborrowerGroup.addControl('lastName', new Control('', Validators.required));
    coborrowerGroup.addControl('email', new Control('', Validators.required));
    coborrowerGroup.addControl('phone', new Control('', Validators.required));
    coborrowerGroup.addControl('dob', new Control('', Validators.required));
    coborrowerGroup.addControl('ssn', new Control('', Validators.required));
    const address = new ControlGroup({});
    address.addControl('add', new Control('', Validators.required));
    address.addControl('city', new Control('', Validators.required));
    address.addControl('state', new Control('', Validators.required));
    address.addControl('zip', new Control('', Validators.required));
    coborrowerGroup.addControl('address', address);
    coborrowerGroup.exclude('address');
    applyForm.addControl('coborrowerGroup', coborrowerGroup);
    applyForm.exclude('coborrowerGroup');
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
    this._changeDetectorRef.detectChanges();
  }

  removeCoborrower(): void {
    this.applyForm.exclude('coborrowerGroup');
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

  get afValue(): string {
    return JSON.stringify(this.applyForm.value, null, 2)
  }
}

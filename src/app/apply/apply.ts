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
import {DROPDOWN_DIRECTIVES} from '../directives/dropdown';

@Component({
  selector: 'apply',
  directives: [DatePicker, DatePickerPopup, ClickOutsideDirective, DROPDOWN_DIRECTIVES],
  providers: [DatePickerService],
  styles: [require('./apply.scss')],
  template: require('./apply.html')
})
export class Apply {
  private applyForm: ControlGroup;
  private borrowerEmploymentArray: ControlArray;
  private coborrowerEmploymentArray: ControlArray;
  private borrowerName: string = 'Borrower';
  private coborrowerName: string = 'Coborrower';
  private borrowerMiddleNameCache: string;
  private coborrowerMiddleNameCache: string;
  private borrowerDob: Date;
  private coborrowerDob: Date;
  private borrowerDobOpen: boolean = false;
  private coborrowerDobOpen: boolean = false;
  private states: Array<any> = States;
  private loanMin: number = 50000;
  private loanMax: number = 2500000;
  private borrowerRent: number = 0.00;
  private coborrowerRent: number = 0.00;

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

  generateOpportunity(): ControlGroup {
    const group = new ControlGroup({
      'decline': new Control(false, Validators.required),
      'ethnicity': new Control('', Validators.required),
      'race': new Control('', Validators.required),
      'sex': new Control('', Validators.required)
    });
    return group;
  }

  generateIncome(): ControlGroup {
    const group = new ControlGroup({
      'baseIncome': new Control('0.00', Validators.required),
      'overtime': new Control('0.00', Validators.required),
      'bonuses': new Control('0.00', Validators.required),
      'commissions': new Control('0.00', Validators.required),
      'dividends': new Control('0.00', Validators.required),
      'rental': new Control('0.00', Validators.required),
      'other': new Control('0.00', Validators.required)
    });
    group.exclude('overtime');
    group.exclude('bonuses');
    group.exclude('commissions');
    group.exclude('dividends');
    group.exclude('rental');
    group.exclude('other');
    return group;
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
    const incomeGroup = new ControlGroup({});
    const borrowerIncomeGroup = this.generateIncome();
    const coborrowerIncomeGroup = this.generateIncome();
    incomeGroup.addControl('borrower', borrowerIncomeGroup);
    incomeGroup.addControl('coborrower', coborrowerIncomeGroup);
    incomeGroup.addControl('rent', new Control('0.00', Validators.required))
    incomeGroup.exclude('coborrower');
    applyForm.addControl('incomeGroup', incomeGroup);
    const declarationsGroup = new ControlGroup({});
    const borrowerDeclarations = this.generateDeclarations();
    const coborrowerDeclarations = this.generateDeclarations();
    declarationsGroup.addControl('borrower', borrowerDeclarations);
    declarationsGroup.addControl('coborrower', coborrowerDeclarations);
    declarationsGroup.exclude('coborrower');
    applyForm.addControl('declarationsGroup', declarationsGroup);
    const opportunityGroup = new ControlGroup({});
    const borrowerOpportunityGroup = this.generateOpportunity();
    const coborrowerOpportunityGroup = this.generateOpportunity();
    opportunityGroup.addControl('borrower', borrowerOpportunityGroup);
    opportunityGroup.addControl('coborrower', coborrowerOpportunityGroup);
    opportunityGroup.exclude('coborrower');
    applyForm.addControl('opportunityGroup', opportunityGroup);
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
    (this.applyForm.controls['incomeGroup'] as ControlGroup).include('coborrower');
    (this.applyForm.controls['declarationsGroup'] as ControlGroup).include('coborrower');
    (this.applyForm.controls['opportunityGroup'] as ControlGroup).include('coborrower');
    this._changeDetectorRef.detectChanges();
  }

  removeCoborrower(): void {
    this.applyForm.exclude('coborrowerGroup');
    (this.applyForm.controls['employmentGroup'] as ControlGroup).exclude('coborrower');
    (this.applyForm.controls['incomeGroup'] as ControlGroup).exclude('coborrower');
    (this.applyForm.controls['declarationsGroup'] as ControlGroup).exclude('coborrower');
    (this.applyForm.controls['opportunityGroup'] as ControlGroup).exclude('coborrower');
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

  setValue(field: Control, value: any): void {
    field.updateValue(value);
  }

  addGroup(parentGroup: string, targetGroup: string): void {
    (this.applyForm.find(parentGroup).find('borrower') as ControlGroup).include(targetGroup);
    (this.applyForm.find(parentGroup).find('coborrower') as ControlGroup).include(targetGroup);
  }

  removeGroup(parentGroup: string, targetGroup: string): void {
    (this.applyForm.find(parentGroup).find('borrower') as ControlGroup).exclude(targetGroup);
    (this.applyForm.find(parentGroup).find('coborrower') as ControlGroup).exclude(targetGroup);
  }

  updateRent(): void {
    (this.applyForm.find('incomeGroup').find('rent') as Control).updateValue(this.borrowerRent + this.coborrowerRent);
  }

  get incomeTotal(): string {
    let total = 0;
    let group = (this.applyForm.find('incomeGroup') as ControlGroup);
    for (const x in group.controls) {
      if (group.contains(x)) {
        let subgroup = (group.find(x) as ControlGroup);
        for (const y in subgroup.controls) {
          if (subgroup.contains(y)) {
            total += parseFloat(parseFloat(subgroup.find(y).value).toFixed(2));
          }
        }
      }
    }
    return total.toFixed(2);
  }

  /*get expensesTotal(): string {
    let total = 0;

    (this.applyForm.find('incomeGroup').find('rent') as Control).updateValue(total);
    return total.toFixed(2);
  }*/

  get afValue(): string {
    return JSON.stringify(this.applyForm.value, null, 2)
  }

  ngOnInit() {
    this.applyForm.controls['borrowerGroup'].find('firstName').valueChanges.subscribe(data => {
      if (this.borrowerName !== data) {
        this.borrowerName = data;
      }
    });
    this.applyForm.controls['coborrowerGroup'].find('firstName').valueChanges.subscribe(data => {
      if (this.coborrowerName !== data) {
        this.coborrowerName = data;
      }
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
        (this.applyForm.controls['declarationsGroup'].find('coborrower') as ControlGroup).exclude('m');
      }
    });
    this.applyForm.controls['declarationsGroup'].find('borrower').find('m').valueChanges.subscribe(data => {
      if (data === true) {
        (this.applyForm.controls['declarationsGroup'].find('borrower') as ControlGroup).include('m1');
        (this.applyForm.controls['declarationsGroup'].find('borrower') as ControlGroup).include('m2');
      } else {
        (this.applyForm.controls['declarationsGroup'].find('borrower') as ControlGroup).exclude('m1');
        (this.applyForm.controls['declarationsGroup'].find('borrower') as ControlGroup).exclude('m2');
      }
    });
    this.applyForm.controls['declarationsGroup'].find('coborrower').find('m').valueChanges.subscribe(data => {
      if (data === true) {
        (this.applyForm.controls['declarationsGroup'].find('coborrower') as ControlGroup).include('m1');
        (this.applyForm.controls['declarationsGroup'].find('coborrower') as ControlGroup).include('m2');
      } else {
        (this.applyForm.controls['declarationsGroup'].find('coborrower') as ControlGroup).exclude('m1');
        (this.applyForm.controls['declarationsGroup'].find('coborrower') as ControlGroup).exclude('m2');
      }
    });
    this.applyForm.controls['opportunityGroup'].find('borrower').find('decline').valueChanges.subscribe(data => {
      if (data === true) {
        (this.applyForm.controls['opportunityGroup'].find('borrower') as ControlGroup).exclude('ethnicity');
        (this.applyForm.controls['opportunityGroup'].find('borrower') as ControlGroup).exclude('race');
        (this.applyForm.controls['opportunityGroup'].find('borrower') as ControlGroup).exclude('sex');
      } else {
        (this.applyForm.controls['opportunityGroup'].find('borrower') as ControlGroup).include('ethnicity');
        (this.applyForm.controls['opportunityGroup'].find('borrower') as ControlGroup).include('race');
        (this.applyForm.controls['opportunityGroup'].find('borrower') as ControlGroup).include('sex');
      }
    });
    this.applyForm.controls['opportunityGroup'].find('coborrower').find('decline').valueChanges.subscribe(data => {
      if (data === true) {
        (this.applyForm.controls['opportunityGroup'].find('coborrower') as ControlGroup).exclude('ethnicity');
        (this.applyForm.controls['opportunityGroup'].find('coborrower') as ControlGroup).exclude('race');
        (this.applyForm.controls['opportunityGroup'].find('coborrower') as ControlGroup).exclude('sex');
      } else {
        (this.applyForm.controls['opportunityGroup'].find('coborrower') as ControlGroup).include('ethnicity');
        (this.applyForm.controls['opportunityGroup'].find('coborrower') as ControlGroup).include('race');
        (this.applyForm.controls['opportunityGroup'].find('coborrower') as ControlGroup).include('sex');
      }
    });
  }
}

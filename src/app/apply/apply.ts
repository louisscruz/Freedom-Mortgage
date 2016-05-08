import {Component, ChangeDetectorRef} from '@angular/core';
import {CORE_DIRECTIVES,
        FORM_DIRECTIVES,
        FormBuilder,
        ControlGroup,
        ControlArray,
        Validators,
        AbstractControl,
        Control} from '@angular/common';
import {States} from './states';
import {FieldsetComponent} from '../components/fieldset.component';
import {BootstrapInputDirective} from '../directives/input.directive';
import {DatePickerComponent} from '../components/datepicker/datepicker.component';
import {DatePickerService} from '../components/datepicker/datepicker.service';
import {DatePickerPopupDirective} from '../components/datepicker/datepicker-popup.component';
import {ClickOutsideDirective} from '../directives/clickOutside';
import {DROPDOWN_DIRECTIVES} from '../directives/dropdown';
import {focusedTextarea} from '../directives/focusedTextarea';
import {CurrencyInputDirective} from '../directives/currency-input.directive';
import {CurrencyInputComponent} from '../components/currency-input.component';

const declarationsKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'm1', 'm2', 'explanations'];
const checkArray = declarationsKeys.slice(0, 9);
const currencyRegex = '(^([0-9]*?)\.?([0-9]{1,2}?)$)';
const regex = new RegExp(currencyRegex);

@Component({
  selector: 'apply',
  directives: [
    DatePickerComponent,
    DatePickerPopupDirective,
    ClickOutsideDirective,
    DROPDOWN_DIRECTIVES,
    focusedTextarea,
    FieldsetComponent,
    BootstrapInputDirective,
    CurrencyInputDirective,
    CurrencyInputComponent
  ],
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
  private borrowerRent: string = '0.00';
  private coborrowerRent: string = '0.00';
  private incomeRentForm: ControlGroup;
  private borrowerCarsArray: ControlArray;
  private coborrowerCarsArray: ControlArray;
  private borrowerOtherAssetsArray: ControlArray;
  private coborrowerOtherAssetsArray: ControlArray;
  private borrowerOtherLiabilitiesArray: ControlArray;
  private coborrowerOtherLiabilitiesArray: ControlArray;
  private borrowerAlimonyArray: ControlArray;
  private coborrowerAlimonyArray: ControlArray;
  private explanationsForm: ControlGroup;
  private borrowerExplanations: Array<string> = [];
  private coborrowerExplanations: Array<string> = [];

  constructor(
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    this.applyForm = this.generateForm();
    /*if (sessionStorage.getItem('cachedForm') !== null) {
      console.log(JSON.parse(sessionStorage.getItem('cachedForm')));
    }
    this.applyForm.valueChanges.subscribe(data => {
      console.log(sessionStorage.getItem('cachedForm'));
      sessionStorage.setItem('cachedForm', JSON.stringify(this.applyForm.value));
      sessionStorage.setItem('cachedForm', JSON.stringify(this.applyForm));
    });*/
    this.explanationsForm = new ControlGroup({
      'borrower': this.generateExplanations(),
      'coborrower': this.generateExplanations()
    });
    this.incomeRentForm = new ControlGroup({
      'borrower': new ControlGroup({
        'rent': new Control('0.00', Validators.compose([
          Validators.required, Validators.pattern(currencyRegex)
        ]))
      }),
      'coborrower': new ControlGroup({
        'rent': new Control('0.00', Validators.compose([
          Validators.required, Validators.pattern(currencyRegex)
        ]))
      })
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

  generateIncome(): ControlGroup {
    const group = new ControlGroup({
      'baseIncome': new Control('0.00', Validators.compose([
        Validators.required, Validators.pattern(currencyRegex)
      ])),
      'overtime': new Control('0.00', Validators.compose([
        Validators.required, Validators.pattern(currencyRegex)
      ])),
      'bonuses': new Control('0.00', Validators.compose([
        Validators.required, Validators.pattern(currencyRegex)
      ])),
      'commissions': new Control('0.00', Validators.compose([
        Validators.required, Validators.pattern(currencyRegex)
      ])),
      'dividends': new Control('0.00', Validators.compose([
        Validators.required, Validators.pattern(currencyRegex)
      ])),
      'rental': new Control('0.00', Validators.compose([
        Validators.required, Validators.pattern(currencyRegex)
      ])),
      'other': new Control('0.00', Validators.compose([
        Validators.required, Validators.pattern(currencyRegex)
      ])),
    });
    group.exclude('overtime');
    group.exclude('bonuses');
    group.exclude('commissions');
    group.exclude('dividends');
    group.exclude('rental');
    group.exclude('other');
    return group;
  }

  generateDeclarations(): ControlGroup {
    const group = new ControlGroup({});
    for (let i = 0; i < declarationsKeys.length; i++) {
      group.addControl(declarationsKeys[i], new Control('', Validators.required));
    }
    group.exclude('m');
    group.exclude('m1');
    group.exclude('m2');
    group.exclude('explanations');
    return group;
  }

  generateExplanations(): ControlGroup {
    const group = new ControlGroup({});
    for (let i = 0; i < checkArray.length; i++) {
      group.addControl(checkArray[i], new Control('', Validators.required));
      group.exclude(checkArray[i]);
    }
    return group;
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
    this.addBorrowerRequiredJob();
    employmentGroup.exclude('coborrower');
    applyForm.addControl('employmentGroup', employmentGroup);
    const incomeGroup = new ControlGroup({});
    const borrowerIncomeGroup = this.generateIncome();
    const coborrowerIncomeGroup = this.generateIncome();
    incomeGroup.addControl('borrower', borrowerIncomeGroup);
    incomeGroup.addControl('coborrower', coborrowerIncomeGroup);
    incomeGroup.addControl('rent', new Control('0.00', Validators.required));
    incomeGroup.exclude('coborrower');
    applyForm.addControl('incomeGroup', incomeGroup);
    const assetsGroup = new ControlGroup({});
    this.borrowerCarsArray = new ControlArray([]);
    this.coborrowerCarsArray = new ControlArray([]);
    this.borrowerOtherAssetsArray = new ControlArray([]);
    this.coborrowerOtherAssetsArray = new ControlArray([]);
    this.borrowerOtherLiabilitiesArray = new ControlArray([]);
    this.coborrowerOtherLiabilitiesArray = new ControlArray([]);
    this.borrowerAlimonyArray = new ControlArray([]);
    this.coborrowerAlimonyArray = new ControlArray([]);
    const borrowerAssetsGroup = new ControlGroup({
      'assets': new ControlGroup({
        'cars': this.borrowerCarsArray,
        'other': this.borrowerOtherAssetsArray
      }),
      'liabilities': new ControlGroup({
        'other': this.borrowerOtherLiabilitiesArray,
        'alimony': this.borrowerAlimonyArray
      })
    });
    const coborrowerAssetsGroup = new ControlGroup({
      'assets': new ControlGroup({
        'cars': this.coborrowerCarsArray,
        'other': this.coborrowerOtherAssetsArray
      }),
      'liabilities': new ControlGroup({
        'other': this.coborrowerOtherLiabilitiesArray,
        'alimony': this.coborrowerAlimonyArray
      })
    });
    assetsGroup.addControl('borrower', borrowerAssetsGroup);
    assetsGroup.addControl('coborrower', coborrowerAssetsGroup);
    assetsGroup.exclude('coborrower');
    assetsGroup.addControl('joined', new Control(true, Validators.required));
    assetsGroup.exclude('joined');
    applyForm.addControl('assetsGroup', assetsGroup);
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
    (this.applyForm.find('declarationsGroup') as ControlGroup).include('coborrower');
    (this.applyForm.find('opportunityGroup') as ControlGroup).include('coborrower');
    (this.applyForm.find('assetsGroup') as ControlGroup).include('joined');
    if (!this.applyForm.find('assetsGroup').find('joined').value) {
      (this.applyForm.find('assetsGroup') as ControlGroup).include('coborrower');
    }
    this._changeDetectorRef.detectChanges();
  }

  removeCoborrower(): void {
    this.applyForm.exclude('coborrowerGroup');
    (this.applyForm.controls['employmentGroup'] as ControlGroup).exclude('coborrower');
    (this.applyForm.controls['incomeGroup'] as ControlGroup).exclude('coborrower');
    (this.applyForm.find('declarationsGroup') as ControlGroup).exclude('coborrower');
    (this.applyForm.find('opportunityGroup') as ControlGroup).exclude('coborrower');
    (this.applyForm.find('assetsGroup') as ControlGroup).exclude('joined');
    (this.applyForm.find('assetsGroup') as ControlGroup).exclude('coborrower');
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

  generateRequiredJob(): ControlGroup {
    const job = new ControlGroup({
      'selfEmployed': new Control(false, Validators.required),
      'company': new Control('', Validators.required),
      'address': this.generateAddress(),
      'phone': new Control('', Validators.required),
      'years': new Control('', Validators.required),
      'months': new Control('', Validators.required),
      'yearsInField': new Control('', Validators.required)
    }, {}, Validators.required);
    return job;
  }

  addBorrowerJob(): void {
    this.borrowerEmploymentArray.push(this.generateJob());
  }

  addBorrowerRequiredJob(): void {
    this.borrowerEmploymentArray.push(this.generateRequiredJob());
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

  setValue(field: Control, value: any, el?: any): void {
    field.updateValue(value);
    if (el) {
      el.focus();
    }
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
    const borrowerRent = this.incomeRentForm.find('borrower').find('rent').value;
    const coborrowerRent = this.incomeRentForm.find('coborrower').find('rent').value;
    let value = (parseFloat(borrowerRent) + parseFloat(coborrowerRent)).toFixed(2);
    (this.applyForm.find('incomeGroup').find('rent') as Control).updateValue(value);
  }

  generateCar(): ControlGroup {
    const group = new ControlGroup({
      'make': new Control('', Validators.required),
      'value': new Control('', Validators.required)
    });
    return group;
  }

  addBorrowerCar(): void {
    if (this.borrowerCarsArray.length >= 3) {
      return;
    }
    this.borrowerCarsArray.push(this.generateCar());
  }

  deleteBorrowerCar(index: number): void {
    this.borrowerCarsArray.removeAt(index);
  }

  addCoborrowerCar(): void {
    if (this.coborrowerCarsArray.length >= 3) {
      return;
    }
    this.coborrowerCarsArray.push(this.generateCar());
  }

  deleteCoborrowerCar(index: number): void {
    this.coborrowerCarsArray.removeAt(index);
  }

  generateAsset(): ControlGroup {
    const group = new ControlGroup({
      'description': new Control('', Validators.required),
      'value': new Control('', Validators.required)
    });
    return group;
  }

  addBorrowerAsset(): void {
    if (this.borrowerOtherAssetsArray.length >= 4) {
      return;
    }
    this.borrowerOtherAssetsArray.push(this.generateAsset());
  }

  deleteBorrowerAsset(index: number): void {
    this.borrowerOtherAssetsArray.removeAt(index);
  }

  addCoborrowerAsset(): void {
    if (this.coborrowerOtherAssetsArray.length >= 4) {
      return;
    }
    this.coborrowerOtherAssetsArray.push(this.generateAsset());
  }

  deleteCoborrowerAsset(index: number): void {
    this.coborrowerOtherAssetsArray.removeAt(index);
  }

  generateLiability(): ControlGroup {
    const group = new ControlGroup({
      'description': new Control('', Validators.required),
      'balance': new Control('', Validators.required)
    });
    return group;
  }

  addBorrowerLiability(): void {
    this.borrowerOtherLiabilitiesArray.push(this.generateLiability());
  }

  deleteBorrowerLiability(index: number): void {
    this.borrowerOtherLiabilitiesArray.removeAt(index);
  }

  addCoborrowerLiability(): void {
    this.coborrowerOtherLiabilitiesArray.push(this.generateLiability());
  }

  deleteCoborrowerLiability(index: number): void {
    this.coborrowerOtherLiabilitiesArray.removeAt(index);
  }

  generateAlimony(): ControlGroup {
    const group = new ControlGroup({
      'description': new Control('', Validators.required),
      'payment': new Control('', Validators.required)
    });
    return group;
  }

  addBorrowerAlimony(): void {
    if (this.borrowerAlimonyArray.length >= 3) {
      return;
    }
    this.borrowerAlimonyArray.push(this.generateAlimony());
  }

  deleteBorrowerAlimony(index: number): void {
    this.borrowerAlimonyArray.removeAt(index);
  }

  addCoborrowerAlimony(): void {
    if (this.coborrowerAlimonyArray.length >= 3) {
      return;
    }
    this.coborrowerAlimonyArray.push(this.generateAlimony());
  }

  deleteCoborrowerAlimony(index: number): void {
    this.coborrowerAlimonyArray.removeAt(index);
  }

  explanationNeeded(group: Array<string>, selector: string): boolean {
    return (group.indexOf(selector) !== -1);
  }

  get incomeTotal(): string {
    let total = 0;
    let group = (this.applyForm.find('incomeGroup') as ControlGroup);
    for (const x in group.controls) {
      if (group.contains(x)) {
        let subgroup = (group.find(x) as ControlGroup);
        for (const y in subgroup.controls) {
          if (subgroup.contains(y)) {
            if (subgroup.find(y).valid) {
              total += parseFloat(parseFloat(subgroup.find(y).value).toFixed(2));
            }
          }
        }
      }
    }
    return total.toFixed(2);
  }

  invalidCurrency(value: string): boolean {
    if (!regex.test(value)) {
      return true;
    }
  }

  /*get borrowerAssetsTotal(): string {
    let total = 0;
    const group = (this.applyForm.find('assetsGroup').find('borrower').find('assets') as ControlGroup);
    for (const x in group.controls) {
      const subgroup = (group.find(x) as ControlArray);
      if (subgroup.length > 0) {
        console.log(subgroup)
        for (let i = 0; i < subgroup.length; i++) {
          const value = parseFloat(parseFloat(subgroup[i].find('value').value).toFixed(2));
          if (typeof value === 'number') {
            total += value;
          }
        }
      }
    }
    return total.toFixed(2);
  }*/

  get coborrowerAssetsTotal(): string {
    return '7';
  }

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
    /*for (const x in (this.applyForm.find('employmentGroup') as ControlGroup).controls) {
      const parentGroup = (this.applyForm.find('employmentGroup').find(x) as ControlArray);
      parentGroup.valueChanges.subscribe(data => {
        console.log(data);
      });
    }*/
    (this.applyForm.find('employmentGroup').find('borrower') as ControlGroup).valueChanges.subscribe(data => {
      const parentGroup = (this.applyForm.find('employmentGroup').find('borrower') as ControlArray);
      let time = 0;
      for (let i = 0; i < parentGroup.controls.length; i++) {
        const group = parentGroup.controls[i];
        if (!group.validator || !group.valid) {
          return;
        } else if (group.find('years').value && group.find('months').value) {
          time += (parseInt(group.find('years').value) * 12);
          time += parseInt(group.find('months').value);
        }
      }
      if (time < 24) {
        this.addBorrowerJob();
      }
    });

    (this.applyForm.find('assetsGroup').find('joined') as Control).valueChanges.subscribe(data => {
      if (this.applyForm.find('assetsGroup').find('joined').value === false) {
        (this.applyForm.find('assetsGroup') as ControlGroup).include('coborrower');
      } else {
        (this.applyForm.find('assetsGroup') as ControlGroup).exclude('coborrower');
      }
    });
    for (const x in (this.applyForm.find('declarationsGroup') as ControlGroup).controls) {
      const parentGroup = (this.applyForm.find('declarationsGroup').find(x) as ControlGroup);
      parentGroup.find('l').valueChanges.subscribe(data => {
        if (data === true) {
          parentGroup.include('m');
        } else {
          parentGroup.exclude('m');
        }
      });
      parentGroup.find('m').valueChanges.subscribe(data => {
        if (data === true) {
          parentGroup.include('m1');
          parentGroup.include('m2');
        } else {
          parentGroup.exclude('m1');
          parentGroup.exclude('m2');
        }
      });
      for (let i = 0; i < checkArray.length; i++) {
        parentGroup.find(checkArray[i]).valueChanges.subscribe(data => {
          if (data === true) {
            (this.explanationsForm.find(x) as ControlGroup).include(checkArray[i]);
            (this.applyForm.find('declarationsGroup').find(x) as ControlGroup).include('explanations');
          } else {
            (this.explanationsForm.find(x) as ControlGroup).exclude(checkArray[i]);
            (this.applyForm.find('declarationsGroup').find(x) as ControlGroup).exclude('explanations');
          }
        });
      }
    }
    for (const x in this.explanationsForm.controls) {
      const parentGroup = (this.explanationsForm.find(x) as ControlGroup);
      for (const y in parentGroup.controls) {
        parentGroup.find(y).valueChanges.subscribe(data => {
          let concat = '';
          for (const z in parentGroup.controls) {
            if (parentGroup.contains(z) && parentGroup.find(z).value !== '') {
              concat += (z.toString() + ': ' + parentGroup.find(z).value) + ' ';
            }
          }
          concat = concat.trim();
          (this.applyForm.find('declarationsGroup').find(x).find('explanations') as Control).updateValue(concat);
        });
      }
    }
    for (const x in (this.applyForm.find('opportunityGroup') as ControlGroup).controls) {
      const parentGroup = (this.applyForm.find('opportunityGroup').find(x) as ControlGroup);
      parentGroup.find('decline').valueChanges.subscribe(data => {
        if (data === true) {
          parentGroup.exclude('ethnicity');
          parentGroup.exclude('race');
          parentGroup.exclude('sex');
        } else {
          parentGroup.include('ethnicity');
          parentGroup.include('race');
          parentGroup.include('sex');
        }
      });
    }
    for (const x in this.incomeRentForm.controls) {
      const group = (this.incomeRentForm.find(x) as ControlGroup);
      group.find('rent').valueChanges.subscribe(data =>  {
        if (group.find('rent').valid) {
          let total = 0.00;
          for (const y in this.incomeRentForm.controls) {
            let value = this.incomeRentForm. find(y).find('rent');
            if (value.valid) {
              total += parseFloat(value.value);
            }
          }
          (this.applyForm.find('incomeGroup').find('rent') as Control).updateValue(total.toFixed(2));
        }
      });
    }
  }
}

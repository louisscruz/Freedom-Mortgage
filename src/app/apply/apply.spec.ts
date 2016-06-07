import {
  it,
  inject,
  injectAsync,
  describe,
  async,
  beforeEach,
  beforeEachProviders
} from '@angular/core/testing';

import {
  Component,
  ChangeDetectorRef,
  provide
} from '@angular/core';

import {
  FORM_DIRECTIVES,
  ControlGroup,
  Control,
  AbstractControl,
  ControlArray
} from '@angular/common';

import {
  HTTP_PROVIDERS
} from '@angular/http';

import {
  TestComponentBuilder
} from '@angular/compiler/testing';

// Load the implementations that should be tested
import {Apply} from './apply';
import {ApplicationService} from '../services/application.service';

describe('Apply', () => {
  // provide our implementations or mocks to the dependency injector
  let builder;
  beforeEachProviders(() => [
    Apply,
    ChangeDetectorRef,
    FORM_DIRECTIVES,
    ApplicationService,
    HTTP_PROVIDERS,
    provide(ControlGroup, {useValue: ControlGroup}),
    provide(Control, {useValue: Control}),
    provide(ControlArray, {useValue: ControlArray}),
  ]);

  describe('initial state', () => {
    it('should default borrower and coborrower names', inject([Apply], (apply) => {
      expect(apply.borrowerName).toEqual('Borrower');
      expect(apply.coborrowerName).toEqual('Coborrower');
    }));

    it('should default DOBs to closed', inject([Apply], (apply) => {
      expect(apply.borrowerDobOpen).toEqual(false);
      expect(apply.coborrowerDobOpen).toEqual(false);
    }));
  });

  describe('applyForm', () => {
    function setFieldString(control: AbstractControl, value: String = 'a') {
      (control as Control).updateValue(value);
    }

    function setFieldEmail(control: AbstractControl) {
      (control as Control).updateValue('a@b.com');
    }

    function setFieldNumber(control: AbstractControl, count: number) {
      let value = '1'.repeat(count);
      (control as Control).updateValue(value);
    }

    function setFieldAddress(controlGroup: AbstractControl) {
      setFieldString(controlGroup.find('add'));
      setFieldString(controlGroup.find('city'));
      setFieldString(controlGroup.find('state'));
      setFieldNumber(controlGroup.find('zip'), 5);
    }

    function setInfoGroup(controlGroup: ControlGroup) {
      setFieldString(controlGroup.find('firstName'));
      setFieldString(controlGroup.find('middleName'));
      setFieldString(controlGroup.find('lastName'));
      setFieldString(controlGroup.find('dob'));
      setFieldNumber(controlGroup.find('phone'), 10);
      setFieldEmail(controlGroup.find('email'));
      setFieldString(controlGroup.find('ssn'));
      setFieldAddress(controlGroup.find('address'));
      if (controlGroup.contains('maritalStatus')) {
        setFieldString(controlGroup.find('maritalStatus'));
      }
    }

    function setLoanGroup(controlGroup: ControlGroup) {
      setFieldString(controlGroup.find('type'), 'purchase');
      setFieldNumber(controlGroup.find('amount'), 5);
      setFieldAddress(controlGroup.find('address'));
    }

    function setEmployment(group: AbstractControl) {
      (group.find('selfEmployed') as Control).updateValue(true);
      (group.find('company') as Control).updateValue('Acme co.');
      setFieldAddress(group.find('address'));
      (group.find('phone') as Control).updateValue('1231231234');
      (group.find('years') as Control).updateValue(2);
      (group.find('months') as Control).updateValue(2);
      (group.find('yearsInField') as Control).updateValue('10');
    }

    function setIncomeGroup(controlGroup: ControlGroup) {
      setFieldNumber(controlGroup.find('baseIncome'), 3);
      setFieldNumber(controlGroup.find('rent'), 3);
    }

    function setAssetsGroup(controlGroup: ControlGroup) {
      const car = (controlGroup.find('assets').find('cars') as ControlArray).controls[0];
      setFieldString(car.find('make'), 'Ford Excursion');
      setFieldNumber(car.find('value'), 4);
      const alimonyGroup = controlGroup.find('liabilities').find('alimony');
      const alimony = (alimonyGroup as ControlArray).controls[0];
      setFieldString(alimony.find('description'), 'test');
      setFieldNumber(alimony.find('payment'), 4);
    }

    beforeEach(async(inject([TestComponentBuilder], (tcb) => {
      builder = tcb;
    })));

    it('should initially create an invalid applyForm', async(() => {
      builder.createAsync(Apply).then((fixture) => {
        fixture.detectChanges();
        const applyForm = fixture.componentInstance.applyForm;
        const borrowerGroup = applyForm.find('borrowerGroup');
        setInfoGroup(borrowerGroup);
        const loanGroup = applyForm.find('loanGroup');
        setLoanGroup(loanGroup);
        expect(applyForm.valid).toEqual(false);
      });
    }));

    it('should show form as valid when filled out', async(() => {
      builder.createAsync(Apply).then((fixture) => {
        fixture.detectChanges();
        const applyForm = fixture.componentInstance.applyForm;
        const borrowerGroup = applyForm.find('borrowerGroup');
        setInfoGroup(borrowerGroup);
        const loanGroup = applyForm.find('loanGroup');
        setLoanGroup(loanGroup);
        const employmentGroup = applyForm.find('employmentGroup');
        setEmployment(employmentGroup);
        const incomeGroup = applyForm.find('incomeGroup');
        setIncomeGroup(incomeGroup.find('borrower'));
        const assetsGroup = applyForm.find('incomeGroup');
        setAssetsGroup(assetsGroup);
        expect(applyForm.valid).toEqual(true);
      });
    }));

    it('should successfully create valid borrowerGroup', async(() => {
      builder.createAsync(Apply).then((fixture) => {
        fixture.detectChanges();
        const applyForm = fixture.componentInstance.applyForm;
        const borrowerGroup = applyForm.find('borrowerGroup');
        setInfoGroup(borrowerGroup);
        expect(applyForm.find('borrowerGroup').valid).toEqual(true);
      });
    }));

    it('should successfully create valid coborrowerGroup', async(() => {
      builder.createAsync(Apply).then((fixture) => {
        fixture.detectChanges();
        const applyForm = fixture.componentInstance.applyForm;
        const coborrowerGroup = applyForm.find('coborrowerGroup');
        setInfoGroup(coborrowerGroup);
        expect(applyForm.find('coborrowerGroup').valid).toEqual(true);
      });
    }));

    describe('loanGroup', () => {
      it('should set default values', async(() => {
        builder.createAsync(Apply).then((fixture) => {
          fixture.detectChanges();
          const applyForm = fixture.componentInstance.applyForm;
          const loanGroup = applyForm.find('loanGroup');
          expect(loanGroup.find('type').value).toEqual('purchase');
          expect(loanGroup.find('amount').value).toEqual('250000');
        });
      }));

      it('should successfully validate the loanGroup for purchase without address', async(() => {
        builder.createAsync(Apply).then((fixture) => {
          fixture.detectChanges();
          const applyForm = fixture.componentInstance.applyForm;
          const loanGroup = applyForm.find('loanGroup');
          expect(loanGroup.valid).toEqual(true);
        });
      }));

      it('should successfully validate the loanGroup for purchase with address', async(() => {
        builder.createAsync(Apply).then((fixture) => {
          fixture.detectChanges();
          const applyForm = fixture.componentInstance.applyForm;
          const loanGroup = applyForm.find('loanGroup');
          fixture.componentInstance.addProperty();
          expect(loanGroup.valid).toEqual(false);
          setFieldAddress(loanGroup.find('address'));
          expect(loanGroup.valid).toEqual(true);
        });
      }));

      it('should successfully validate the loanGroup for refinance', async(() => {
        builder.createAsync(Apply).then((fixture) => {
          fixture.detectChanges();
          const applyForm = fixture.componentInstance.applyForm;
          const loanGroup = applyForm.find('loanGroup');
          loanGroup.find('type').updateValue('refinance');
          fixture.componentInstance.setLoanType('refinance');
          expect(loanGroup.valid).toEqual(false);
          fixture.componentInstance.removeProperty();
          expect(loanGroup.valid).toEqual(true);
          fixture.componentInstance.addProperty();
          expect(loanGroup.valid).toEqual(false);
          setFieldAddress(loanGroup.find('address'));
          expect(loanGroup.valid).toEqual(true);
        });
      }));
    });

    describe('employmentGroup', () => {
      it('should successfully show valid values as valid', async(() => {
        builder.createAsync(Apply).then((fixture) => {
          fixture.detectChanges();
          const applyForm = fixture.componentInstance.applyForm;
          const employmentGroup = applyForm.find('employmentGroup');
          const group = employmentGroup.find('borrower').controls[0];
          setEmployment(group);
          expect(employmentGroup.valid).toEqual(true);
        });
      }));

      describe('invalid test cases', () => {
        it('should require company', async(() => {
          builder.createAsync(Apply).then((fixture) => {
            fixture.detectChanges();
            const applyForm = fixture.componentInstance.applyForm;
            const employmentGroup = applyForm.find('employmentGroup');
            const group = (employmentGroup.find('borrower').controls[0] as ControlGroup);
            setEmployment(group);
            (group.find('company') as Control).updateValue('');
            expect(employmentGroup.valid).toEqual(false);
          });
        }));

        it('should require phone', async(() => {
          builder.createAsync(Apply).then((fixture) => {
            fixture.detectChanges();
            const applyForm = fixture.componentInstance.applyForm;
            const employmentGroup = applyForm.find('employmentGroup');
            const group = (employmentGroup.find('borrower').controls[0] as ControlGroup);
            setEmployment(group);
            (group.find('phone') as Control).updateValue('');
            expect(employmentGroup.valid).toEqual(false);
          });
        }));

        it('should require years', async(() => {
          builder.createAsync(Apply).then((fixture) => {
            fixture.detectChanges();
            const applyForm = fixture.componentInstance.applyForm;
            const employmentGroup = applyForm.find('employmentGroup');
            const group = (employmentGroup.find('borrower').controls[0] as ControlGroup);
            setEmployment(group);
            (group.find('years') as Control).updateValue(null);
            expect(employmentGroup.valid).toEqual(false);
          });
        }));

        it('should require months', async(() => {
          builder.createAsync(Apply).then((fixture) => {
            fixture.detectChanges();
            const applyForm = fixture.componentInstance.applyForm;
            const employmentGroup = applyForm.find('employmentGroup');
            const group = (employmentGroup.find('borrower').controls[0] as ControlGroup);
            setEmployment(group);
            (group.find('months') as Control).updateValue(null);
            expect(employmentGroup.valid).toEqual(false);
          });
        }));

        it('should require years in field', async(() => {
          builder.createAsync(Apply).then((fixture) => {
            fixture.detectChanges();
            const applyForm = fixture.componentInstance.applyForm;
            const employmentGroup = applyForm.find('employmentGroup');
            const group = (employmentGroup.find('borrower').controls[0] as ControlGroup);
            setEmployment(group);
            (group.find('yearsInField') as Control).updateValue(null);
            expect(employmentGroup.valid).toEqual(false);
          });
        }));
      });
    });

    describe('incomeGroup', () => {

    });
  });
});

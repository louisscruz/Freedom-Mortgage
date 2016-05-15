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
  TestComponentBuilder
} from '@angular/compiler/testing';

// Load the implementations that should be tested
import {Apply} from './apply';

describe('Apply', () => {
  // provide our implementations or mocks to the dependency injector
  let builder;
  beforeEachProviders(() => [
    Apply,
    ChangeDetectorRef,
    FORM_DIRECTIVES,
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
    function setFieldString(control: AbstractControl) {
      (control as Control).updateValue('a');
    }

    function setFieldEmail(control: AbstractControl) {
      (control as Control).updateValue('a@b.com');
    }

    function setFieldNumber(control: AbstractControl, count: number) {
      let value = '1'.repeat(count);
      (control as Control).updateValue(value);
    }

    function setFieldAddress(controlGroup: ControlGroup) {
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
      setFieldAddress((controlGroup.find('address') as ControlGroup));
      if (controlGroup.contains('maritalStatus')) {
        setFieldString(controlGroup.find('maritalStatus'));
      }
    }

    beforeEach(async(inject([TestComponentBuilder], (tcb) => {
      builder = tcb;
    })));

    it('should initially create an invalid applyForm', async(() => {
      builder.createAsync(Apply).then((fixture) => {
        fixture.detectChanges();
        let applyForm = fixture.componentInstance.applyForm;
        expect(applyForm.valid).toEqual(false);
      });
    }));

    it('should successfully create valid borrowerGroup', async(() => {
      builder.createAsync(Apply).then((fixture) => {
        fixture.detectChanges();
        let applyForm = fixture.componentInstance.applyForm;
        const borrowerGroup = applyForm.find('borrowerGroup');
        setInfoGroup(borrowerGroup);
        expect(applyForm.find('borrowerGroup').valid).toEqual(true);
      });
    }));

    it('should successfully create valid coborrowerGroup', async(() => {
      builder.createAsync(Apply).then((fixture) => {
        fixture.detectChanges();
        let applyForm = fixture.componentInstance.applyForm;
        const coborrowerGroup = applyForm.find('coborrowerGroup');
        setInfoGroup(coborrowerGroup);
        expect(applyForm.find('coborrowerGroup').valid).toEqual(true);
      });
    }));

    describe('loanGroup', () => {
      it('should set default values', async(() => {
        builder.createAsync(Apply).then((fixture) => {
          fixture.detectChanges();
          let applyForm = fixture.componentInstance.applyForm;
          const loanGroup = applyForm.find('loanGroup');
          expect(loanGroup.find('type').value).toEqual('purchase');
          expect(loanGroup.find('amount').value).toEqual('250000');
        });
      }));

      it('should successfully validate the loanGroup for purchase without address', async(() => {
        builder.createAsync(Apply).then((fixture) => {
          fixture.detectChanges();
          let applyForm = fixture.componentInstance.applyForm;
          const loanGroup = applyForm.find('loanGroup');
          expect(loanGroup.valid).toEqual(true);
        });
      }));

      it('should successfully validate the loanGroup for purchase with address', async(() => {
        builder.createAsync(Apply).then((fixture) => {
          fixture.detectChanges();
          let applyForm = fixture.componentInstance.applyForm;
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
          let applyForm = fixture.componentInstance.applyForm;
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
      function setEmployment(group: AbstractControl, years: number, months: number) {
        (group.find('selfEmployed') as Control).updateValue(true);
        (group.find('company') as Control).updateValue('Acme co.');
        setFieldAddress((group.find('address') as ControlGroup));
        (group.find('phone') as Control).updateValue('1231231234');
        (group.find('years') as Control).updateValue(years.toString());
        (group.find('months') as Control).updateValue(months.toString());
        (group.find('yearsInField') as Control).updateValue('10');
      }
      it('should successfully validate borrower employment information', async(() => {
        builder.createAsync(Apply).then((fixture) => {
          fixture.detectChanges();
          let applyForm = fixture.componentInstance.applyForm;
          const employmentGroup = applyForm.find('employmentGroup');
          const borrowerJobs = (employmentGroup.find('borrower') as ControlArray);
          expect(borrowerJobs.length).toEqual(1);
          setEmployment(borrowerJobs.controls[0], 1, 11);
          expect(employmentGroup.valid).toEqual(false);
          setEmployment(borrowerJobs.controls[0], 2, 0);
          expect(employmentGroup.valid).toEqual(true);
        });
      }));
    });

    describe('incomeGroup', () => {

    });
  });
});

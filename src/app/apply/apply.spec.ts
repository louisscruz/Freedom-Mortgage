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
  });
});

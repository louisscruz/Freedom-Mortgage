import {Directive, Attribute, HostListener, HostBinding} from '@angular/core';
import {NgFormControl, Control} from '@angular/common';

//var phoneUtil = require('google-libphonenumber').phoneUtil;

@Directive({
  selector: '[mask]'
})
export class MaskDirective {
  public maskPattern: string;
  public placeHolderCounts: number;
  public dividers: string[];
  public modelValue: string;
  public viewValue: string;
  constructor(public model: NgFormControl, @Attribute('mask')maskPattern: string) {
    this.dividers = maskPattern.replace(/\*/g,'').split('');
    this.dividers.push(' ');
    this.generatePattern(maskPattern);
    console.log('pattern is:');
    console.log(this.maskPattern);
  }
  @HostListener('keyup', ['$event.target'])
  onInputChange() {
    /*this.modelValue = this.getModelValue();
    var stringToFormat = this.modelValue;
    if (stringToFormat.length < 10){
      stringToFormat = this.padString(stringToFormat);
    }
    this.viewValue = this.format(stringToFormat);
    this.model.viewToModelUpdate(this.modelValue);
    this.model.valueAccessor.writeValue(this.viewValue);*/
    //this.modelValue = this.getModelValue();
    //let stringToFormat = this.getModelValue().value;
    //this.modelValue = this.format(stringToFormat);
    //this.model.viewToModelUpdate(this.modelValue);
    //(this.model.value as Control).updateValue(this.modelValue);
    //this.model.control.updateValue(this.modelValue);
    //console.log(this.model.control);
    //var tel = phoneUtil.parse('+12024561111');
    //this.model.valueAccessor.writeValue(this.modelValue);

  };
  generatePattern(patternString) {
    this.placeHolderCounts = (patternString.match(/\*/g) || []).length;
    for (var i = 0; i < this.placeHolderCounts; i++) {
      patternString = patternString.replace('*', '{' + i + '}');
    }
    this.maskPattern = patternString;
  }
  /*format(s) {
    let formattedString = this.maskPattern;
    for (var i = 0; i < this.placeHolderCounts; i++) {
      formattedString = formattedString.replace('{' + i + '}', s.charAt(i));
    }
    return formattedString;
  }*/
  format(s: string): string {
    let formattedString = this.maskPattern;
    for (let i = 0; i < this.placeHolderCounts; i++) {
      formattedString = formattedString.replace('{' + i + '}', s.charAt(i));
    }
    return formattedString;
  }
  padString(s) {
    let pad = '         ';
    return (s + pad).substring(0, pad.length);
  }
  getModelValue() {
    let modelValue = this.model.value;
    for (var i = 0; i < this.dividers.length; i++) {
      while (modelValue.indexOf(this.dividers[i]) > -1) {
        modelValue = modelValue.replace(this.dividers[i], '');
      }
    }
    return modelValue;
  }
}

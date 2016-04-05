import {Directive, Attribute, HostListener} from 'angular2/core';
import {NgFormControl} from 'angular2/common';

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
  }
  @HostListener('keyup', ['$event.target'])
  onInputChange() {
    this.modelValue = this.getModelValue();
    let stringToFormat = this.modelValue;
    //let stringToFormat = this.modelValue;
    //if (stringToFormat.length < 11) {
      //stringToFormat = this.padString(stringToFormat);
    //}
    this.viewValue = this.format(stringToFormat);
    console.log(this.viewValue);
    //this.model.viewToModelUpdate(this.modelValue);
    //this.model.valueAccessor.writeValue(this.viewValue);
    //this.model.viewToModelUpdate(this.viewValue);
    //this.model.value = this.viewValue;
    //alert(this.modelValue.toString());
    this.model.valueAccessor.writeValue(this.viewValue);
    console.log(this.modelValue)
    console.log(this.model)
  };
  generatePattern(patternString) {
    this.placeHolderCounts = (patternString.match(/\*/g) || []).length;
    for (var i = 0; i < this.placeHolderCounts; i++) {
      patternString = patternString.replace('*', '{' + i + '}');
    }
    this.maskPattern = patternString;
  }
  format(s) {
    let formattedString = this.maskPattern;
    for (var i = 0; i < this.placeHolderCounts; i++) {
      formattedString = formattedString.replace('{' + i + '}', s.charAt(i));
    }
    return formattedString;
  }
  padString(s) {
    let pad = '          ';
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

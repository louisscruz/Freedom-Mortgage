import {Component} from 'angular2/core';
import {CORE_DIRECTIVES,
        FORM_DIRECTIVES,
        FormBuilder,
        ControlGroup,
        Validators,
        AbstractControl,
        Control} from 'angular2/common';

@Component({
  selector: 'contact',
  styles: [require('./contact.scss')],
  template: require('./contact.html')
})
export class Contact {
  private contactForm: ControlGroup;
  private name: AbstractControl;
  private email: AbstractControl;
  private body: AbstractControl;
  constructor(private _fb: FormBuilder) {
    /*function emailValidator(control: Control): { [s: string]: boolean } {
      if (!control.value.match(/.+@.+\..+/i) && control.value) {
        return {invalidEmail: true};
      }
    }*/
    this.contactForm = _fb.group({
      'name': ['', Validators.compose([
        Validators.required
      ])],
      'email': ['', Validators.compose([
        Validators.required//, emailValidator
      ])],
      'body': ['', Validators.compose([
        Validators.required
      ])]
    });
    this.name = this.contactForm.controls['name'];
    this.email = this.contactForm.controls['email'];
    this.body = this.contactForm.controls['body'];
  }

  ngOnInit() {}

}

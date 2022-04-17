import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Directive } from '@angular/core';

export const passwordValidator = (control: AbstractControl): ValidationErrors | null => {
  const format = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(control.value);

  if (format) {
    return null;
  }

  return {password: true};
};

@Directive({
  selector: '[appPassword]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ValidatePasswordDirective,
    multi: true
  }]
})
export class ValidatePasswordDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return passwordValidator(control);
  }
}

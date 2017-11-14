import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[passwordValidate][formControlName],[passwordValidate][formControl],[passwordValidate][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => PasswordValidatorDirective), multi: true }
    ]
})
export class PasswordValidatorDirective implements Validator {
  constructor( @Attribute('passwordValidate') public passwordValidate: string,
               @Attribute('reverse') public reverse: string) {

  }

  validate(c: AbstractControl): { [key: string]: any } {
         // self value
         let v = c.value;
         // control vlaue
         let e = c.root.get(this.passwordValidate);
         // value not equal
         if (e && v !== e.value && !this.isReverse) {
             return {
                 passwordValidate: false
             }
         }
         // value equal and reverse
         if (e && v === e.value && this.isReverse) {
             delete e.errors['passwordValidate'];
             if (!Object.keys(e.errors).length) e.setErrors(null);
         }
         // value not equal and reverse
         if (e && v !== e.value && this.isReverse) {
             e.setErrors({ passwordValidate: false });
         }
         return null;
     }

    private get isReverse() {
      if (!this.reverse) return false;
        return this.reverse === 'true' ? true: false;
    }
}

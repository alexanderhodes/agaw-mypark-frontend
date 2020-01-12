import {AbstractControl, FormGroup, ValidatorFn} from '@angular/forms';

export function DateValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.after) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value > matchingControl.value) {
      matchingControl.setErrors({after: true});
    } else {
      matchingControl.setErrors(null);
    }
  };
}

export function DateInFutureValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.errors) {
      return;
    }
    const date = toDate(control.value);
    console.log('date', date);

    if (date.toDateString() === 'Invalid Date') {
      return {invalid: {value: control.value}};
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date.getTime() <= today.getTime() ? {future: {value: control.value}} : null;
  };
}

function toDate(text: string) {
  return new Date(text);
}

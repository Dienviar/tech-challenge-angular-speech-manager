import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  controlValidator(form: FormGroup, controlName: string): boolean {
    const control = form.get(controlName);
    return control ? control.invalid && (control.touched || control.dirty) : false;
  }
}

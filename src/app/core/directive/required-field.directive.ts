import { Directive, ElementRef, HostListener, input } from '@angular/core';

@Directive({
  selector: '[appRequiredField]',
  standalone: true
})
export class RequiredFieldDirective {
  appRequiredField = input<boolean>(false);

  constructor(private el: ElementRef) {}

  @HostListener('blur') onBlur() {
    if (this.appRequiredField()) {
      const inputElement = this.el.nativeElement as HTMLInputElement;
      if (!inputElement.value) {
        inputElement.classList.add('is-invalid');
      } else {
        inputElement.classList.remove('is-invalid');
      }
    }
  }
}

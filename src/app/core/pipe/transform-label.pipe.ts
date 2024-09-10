import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformLabel',
  standalone: true
})
export class TransformLabelPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    return value.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  }
}

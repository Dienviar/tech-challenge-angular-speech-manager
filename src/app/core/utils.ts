import { FormControl } from '@angular/forms';

export type FormGroupType<T> = {
  [P in keyof T]: FormControl<T[P] | null | undefined>;
};

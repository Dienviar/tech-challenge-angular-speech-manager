import { ToastStatus } from '../shared/toast/toast.model';

export interface ResponseObj {
  code: number;
  message: string;
  label: ToastStatus;
}

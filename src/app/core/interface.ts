import { AlertType } from './types';

export interface ResponseObj {
  code: number;
  message: string;
  label: AlertType;
}

export interface NavigationElem {
  label: string;
  routerLink: string;
}

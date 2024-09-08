import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResponseObj } from '../../core/interface';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastMessageStateSubject = new BehaviorSubject<ResponseObj | undefined>(undefined);
  toastMessageState$: Observable<ResponseObj | undefined> = this.toastMessageStateSubject.asObservable();

  toastMessage(response: ResponseObj) {
    this.toastMessageStateSubject.next(response);
  }
}

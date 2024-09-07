import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  private dialogStateSubject = new BehaviorSubject<boolean>(false);
  dialogState$: Observable<boolean> = this.dialogStateSubject.asObservable();

  private dialogAcceptedSubject = new Subject<void>();
  dialogAccepted$: Observable<void> = this.dialogAcceptedSubject.asObservable();

  openDialog(): void {
    this.dialogStateSubject.next(true);
  }

  closeDialog(): void {
    this.dialogStateSubject.next(false);
  }

  acceptDialog(): void {
    this.dialogAcceptedSubject.next();
    this.closeDialog();
  }
}

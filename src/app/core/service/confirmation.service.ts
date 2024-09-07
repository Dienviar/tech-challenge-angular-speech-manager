import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Response } from '../speech.model';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  private dialogStateSubject = new BehaviorSubject<boolean>(false);
  dialogState$: Observable<boolean> = this.dialogStateSubject.asObservable();

  private dialogAcceptedSubject = new Subject<void>();
  dialogAccepted$: Observable<void> = this.dialogAcceptedSubject.asObservable();

  private dialogTitleSubject = new BehaviorSubject<string>('');
  dialogTitle$: Observable<string> = this.dialogTitleSubject.asObservable();

  private dialogContentSubject = new BehaviorSubject<string>('');
  dialogContent$: Observable<string> = this.dialogContentSubject.asObservable();

  private dialogResultSubject = new BehaviorSubject<Response | undefined>(undefined);
  dialogResult$: Observable<Response | undefined> = this.dialogResultSubject.asObservable();

  openDialog(title: string, content: string): void {
    this.dialogTitleSubject.next(title);
    this.dialogContentSubject.next(content);
    this.dialogStateSubject.next(true);
  }

  closeDialog(): void {
    this.dialogStateSubject.next(false);
  }

  acceptDialog(): void {
    this.dialogAcceptedSubject.next();
    this.closeDialog();
  }

  dialogResult(response: Response) {
    this.dialogResultSubject.next(response);
  }
}

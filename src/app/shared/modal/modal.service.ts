import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ModalService {
  private modalStateSubject = new BehaviorSubject<boolean>(false);
  modalState$: Observable<boolean> = this.modalStateSubject.asObservable();

  get modalState(): boolean {
    return this.modalStateSubject.getValue();
  }

  openModal(): void {
    this.modalStateSubject.next(true);
  }

  closeModal(): void {
    this.modalStateSubject.next(false);
  }
}

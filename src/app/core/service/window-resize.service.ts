import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowResizeService implements OnDestroy {
  private resizeSubject = new BehaviorSubject<number>(window.innerWidth);
  public resize$ = this.resizeSubject.asObservable();

  private resizeListener: () => void;

  constructor() {
    this.resizeListener = () => this.resizeSubject.next(window.innerWidth);
    window.addEventListener('resize', this.resizeListener);
    this.resizeSubject.next(window.innerWidth);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeListener);
  }
}

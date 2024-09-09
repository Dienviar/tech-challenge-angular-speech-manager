import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowResizeService implements OnDestroy {
  private windowWidthSubject = new BehaviorSubject<number>(window.innerWidth);
  public windowWidth$ = this.windowWidthSubject.asObservable();

  private windowHeightSubject = new BehaviorSubject<number>(window.innerHeight);
  public windowHeight$ = this.windowHeightSubject.asObservable();

  private resizeListener: () => void;

  constructor() {
    this.resizeListener = () => {
      this.windowWidthSubject.next(window.innerWidth);
      this.windowHeightSubject.next(window.innerHeight);
    };

    window.addEventListener('resize', this.resizeListener);
    this.windowWidthSubject.next(window.innerWidth);
    this.windowHeightSubject.next(window.innerHeight);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeListener);
  }
}

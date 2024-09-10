import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowResizeService implements OnDestroy {
  private windowWidthSubject = new BehaviorSubject<number>(window.innerWidth);
  public windowWidth$: Observable<number> = this.windowWidthSubject.asObservable().pipe(distinctUntilChanged());

  private windowHeightSubject = new BehaviorSubject<number>(window.innerHeight);
  public windowHeight$: Observable<number> = this.windowHeightSubject.asObservable().pipe(distinctUntilChanged());

  private resizeListener: () => void;

  constructor() {
    this.resizeListener = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      this.windowWidthSubject.next(newWidth);
      this.windowHeightSubject.next(newHeight);
    };

    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeListener);
  }
}

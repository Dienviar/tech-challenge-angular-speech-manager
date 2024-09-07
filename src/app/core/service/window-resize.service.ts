import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowResizeService implements OnDestroy {
  private resizeSubject = new BehaviorSubject<number>(window.innerWidth);
  public resize$ = this.resizeSubject.asObservable();
  private resizeObserver: ResizeObserver;

  constructor() {
    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        this.resizeSubject.next(entry.contentRect.width);
      }
    });

    this.resizeObserver.observe(document.body);

    this.resizeSubject.next(window.innerWidth);
  }

  ngOnDestroy() {
    this.resizeObserver.disconnect();
  }
}

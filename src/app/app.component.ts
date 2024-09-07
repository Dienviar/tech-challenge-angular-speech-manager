import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgbModule, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private _router: Router) {}

  isCollapsed = signal<boolean>(true);
  currentUrl = signal<string | undefined>(undefined);

  ngOnInit() {
    this._router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.currentUrl.set(event.url);
    });
  }

  openNav() {
    this.isCollapsed.update((c) => !c);
  }
}

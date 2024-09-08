import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { NavigationElem } from './core/interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgbModule, RouterModule, CommonModule, ConfirmationDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  constructor(private _router: Router) {}

  isCollapsed = signal<boolean>(true);
  currentUrl = signal<string | undefined>(undefined);

  navigation: NavigationElem[] = [
    {
      label: 'List of Speech',
      routerLink: '/'
    },
    {
      label: 'Create New Speech',
      routerLink: '/create'
    },
    {
      label: 'Search Speech',
      routerLink: '/search'
    }
  ];

  ngOnInit() {
    this._router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.currentUrl.set(event.url);
    });
  }

  openNav() {
    this.isCollapsed.set(!this.isCollapsed());
  }
}

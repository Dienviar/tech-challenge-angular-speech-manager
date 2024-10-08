import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgClass } from '@angular/common';
import { NavigationElem } from './navigation.mode';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NgClass, NgbModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit {
  constructor(private _router: Router) {}

  isCollapsed = signal<boolean>(true);
  currentUrl = signal<string | undefined>(undefined);

  navigation = signal<NavigationElem[]>([
    {
      label: 'List of Speech',
      routerLink: '/'
    },
    {
      label: 'Create Speech',
      routerLink: '/create'
    }
  ]);

  ngOnInit() {
    this._router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.currentUrl.set(event.url);
    });
  }

  openNav() {
    this.isCollapsed.set(!this.isCollapsed());
  }
}

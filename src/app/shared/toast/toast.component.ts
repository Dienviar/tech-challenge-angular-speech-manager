import { Component } from '@angular/core';
import { ToastService } from './toast.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgIf, NgbAlertModule, AsyncPipe],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  constructor(public _toastService: ToastService) {}
}

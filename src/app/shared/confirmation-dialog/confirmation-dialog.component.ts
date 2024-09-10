import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfirmationService } from './confirmation.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationDialogComponent {
  constructor(public _confirmationService: ConfirmationService) {}

  accept() {
    this._confirmationService.acceptDialog();
  }

  cancel() {
    this._confirmationService.closeDialog();
  }
}

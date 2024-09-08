import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfirmationService } from './confirmation.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationDialogComponent {
  constructor(public _confirmationService: ConfirmationService) {}

  accept() {
    this._confirmationService.acceptDialog();

    // this.isAlertActive.set(true);

    // setTimeout(() => {
    //   this.isAlertActive.set(false);
    // }, 3000);
  }

  cancel() {
    this._confirmationService.closeDialog();
  }
}

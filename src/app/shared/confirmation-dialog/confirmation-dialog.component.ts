import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { ConfirmationService } from './confirmation.service';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [NgbAlertModule, CommonModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationDialogComponent implements OnInit {
  constructor(public _confirmationService: ConfirmationService) {}

  isDialogActive = signal(false);
  isAlertActive = signal(false);

  ngOnInit(): void {
    this._confirmationService.dialogState$.subscribe((state: boolean) => {
      this.isDialogActive.set(state);
    });
  }

  accept() {
    this._confirmationService.acceptDialog();

    this.isAlertActive.set(true);

    setTimeout(() => {
      this.isAlertActive.set(false);
    }, 3000);
  }

  cancel() {
    this._confirmationService.closeDialog();
  }
}

import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { ConfirmationService } from '../../core/service/confirmation.service';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [NgbAlertModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationDialogComponent implements OnInit {
  constructor(public confirmationService: ConfirmationService) {}

  isDialogActive = signal(false);
  isAlertActive = signal(false);

  ngOnInit(): void {
    this.confirmationService.dialogState$.subscribe((state: boolean) => {
      this.isDialogActive.set(state);
    });
  }

  accept() {
    this.confirmationService.acceptDialog();

    this.isAlertActive.set(true);

    setTimeout(() => {
      this.isAlertActive.update(() => false);
    }, 3000);
  }

  close() {
    this.confirmationService.closeDialog();
  }
}

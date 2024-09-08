import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { ModalService } from './modal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
  modalClose = output<boolean>();

  constructor(public _modalService: ModalService) {}

  closeModal() {
    this.modalClose.emit(true);
    this._modalService.closeModal();
  }
}

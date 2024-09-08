import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { ModalService } from './modal.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [AsyncPipe],
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

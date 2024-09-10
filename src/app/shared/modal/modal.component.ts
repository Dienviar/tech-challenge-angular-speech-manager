import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ModalService } from './modal.service';
import { AsyncPipe } from '@angular/common';
import { ModalPadding, ModalPosition } from './modal.model';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
  position = input.required<ModalPosition>();
  padding = input.required<ModalPadding>();

  modalClose = output<boolean>();

  constructor(public _modalService: ModalService) {}

  closeModal() {
    this.modalClose.emit(true);
    this._modalService.closeModal();
  }
}

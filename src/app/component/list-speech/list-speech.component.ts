import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { Speech } from '../speech.model';
import { UpsertSpeechComponent } from '../upsert-speech/upsert-speech.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { WindowResizeService } from '../../core/service/window-resize.service';
import { ModalComponent } from '../../shared/modal/modal.component';
import { SpeechService } from '../speech.service';
import { ModalService } from '../../shared/modal/modal.service';

@Component({
  selector: 'app-list-speech',
  standalone: true,
  imports: [CommonModule, UpsertSpeechComponent, NgbAlertModule, ModalComponent],
  templateUrl: './list-speech.component.html',
  styleUrl: './list-speech.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListSpeechComponent implements OnInit {
  constructor(
    private _speechService: SpeechService,
    private _windowResizeService: WindowResizeService,
    private _modalService: ModalService
  ) {}

  selectedSpeechId = signal<number>(-1);

  currentPage = signal<number>(1);
  pageSize = 5;
  windowBreakPoint = 900;
  windowWidth = signal<number>(0);

  get totalPages(): number {
    return Math.ceil(this._speechService.getAllSpeechesData.length / this.pageSize);
  }

  get pagedData(): Speech[] {
    const start = (this.currentPage() - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this._speechService.getAllSpeechesData.slice(start, end);
  }

  ngOnInit() {
    this._windowResizeService.resize$.subscribe((width) => {
      this.windowWidth.set(Math.trunc(width));

      if (this.selectedSpeechId() !== -1) {
        if (width < this.windowBreakPoint) {
          this.openModal();
        } else if (width > this.windowBreakPoint && this._modalService.modalState) {
          this.closeModal();
        }
      }
    });
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
  }

  onCardClick(id: number) {
    this.selectedSpeechId.set(id);
    if (this.windowWidth() < this.windowBreakPoint) this.openModal();
  }

  onSpeechDeleted() {
    this.clearSelectedSpeechId();
    if (this.windowWidth() < this.windowBreakPoint) this.closeModal();
  }

  openModal() {
    this._modalService.openModal();
  }

  closeModal() {
    this._modalService.closeModal();
  }

  clearSelectedSpeechId() {
    this.selectedSpeechId.set(-1);
  }
}

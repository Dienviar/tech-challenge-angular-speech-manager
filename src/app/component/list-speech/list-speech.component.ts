import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Speech } from '../speech.model';
import { UpsertSpeechComponent } from '../upsert-speech/upsert-speech.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { WindowResizeService } from '../../core/service/window-resize.service';
import { ModalComponent } from '../../shared/modal/modal.component';
import { SpeechService } from '../speech.service';
import { ModalService } from '../../shared/modal/modal.service';
import { Subscription } from 'rxjs';
import { AsyncPipe, DatePipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { SearchSpeechComponent } from '../search-speech/search-speech.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-speech',
  standalone: true,
  imports: [NgClass, NgTemplateOutlet, DatePipe, UpsertSpeechComponent, NgbAlertModule, ModalComponent, SearchSpeechComponent, AsyncPipe, RouterModule],
  templateUrl: './list-speech.component.html',
  styleUrl: './list-speech.component.css',
  providers: [ModalService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListSpeechComponent implements OnInit, OnDestroy {
  constructor(
    public _speechService: SpeechService,
    private _windowResizeService: WindowResizeService,
    private _modalService: ModalService
  ) {}

  private subscription = new Subscription();

  selectedSpeechId = signal<string | undefined>(undefined);
  totalPages = signal<number>(0);

  currentPage = signal<number>(1);
  pageSize = 5;
  windowBreakPoint = 900;
  windowWidth = signal<number>(0);

  ngOnInit() {
    this.subscription.add(
      this._speechService.speechData$.subscribe((data) => {
        this.totalPages.set(Math.ceil(data.length / this.pageSize));
      })
    );

    this.subscription.add(
      this._windowResizeService.resize$.subscribe((width) => {
        this.windowWidth.set(Math.trunc(width));

        if (this.selectedSpeechId()) {
          if (this.windowWidth() < this.windowBreakPoint && !this._modalService.modalState) {
            this._modalService.openModal();
          } else if (this.windowWidth() > this.windowBreakPoint && this._modalService.modalState) {
            this._modalService.closeModal();
          }
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
  }

  onCardClick(id: string) {
    this.selectedSpeechId.set(id);
    if (this.windowWidth() < this.windowBreakPoint) this._modalService.openModal();
  }

  onSpeechDeleted() {
    this.clearSelectedSpeechId();
    if (this.windowWidth() < this.windowBreakPoint) this._modalService.closeModal();
  }

  onSpeechSearch(speechSearch: Speech) {
    if (this.selectedSpeechId()) this.selectedSpeechId.set(undefined);
    this._speechService.searchSpeech(speechSearch);
  }

  clearSelectedSpeechId() {
    this.selectedSpeechId.set(undefined);
  }
}

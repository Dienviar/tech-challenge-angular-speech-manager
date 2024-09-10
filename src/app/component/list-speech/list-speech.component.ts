import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';
import { Speech } from '../speech.model';
import { UpsertSpeechComponent } from '../upsert-speech/upsert-speech.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { WindowResizeService } from '../../core/service/window-resize.service';
import { ModalComponent } from '../../shared/modal/modal.component';
import { SpeechService } from '../speech.service';
import { ModalService } from '../../shared/modal/modal.service';
import { BehaviorSubject, Subscription } from 'rxjs';
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
export class ListSpeechComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    public _speechService: SpeechService,
    public _windowResizeService: WindowResizeService,
    private _modalService: ModalService
  ) {}

  @ViewChild(SearchSpeechComponent) searchSpeechComponent!: SearchSpeechComponent;
  @ViewChildren('speechItem') speechItems!: QueryList<ElementRef>;

  private subscription = new Subscription();

  selectedSpeechId = signal<string | undefined>(undefined);
  totalPages = signal<number>(0);

  pageSize = signal<number>(5);
  windowBreakPoint = 900;
  windowWidth = signal<number>(0);
  windowHeight = signal<number>(0);

  paginatedSpeechData$ = new BehaviorSubject<Speech[]>([]);
  currentPage$ = new BehaviorSubject<number>(1);

  ngOnInit() {
    this.setDataPages(1);
  }

  ngAfterViewInit() {
    this.subscription.add(
      this._windowResizeService.windowWidth$.subscribe((width) => {
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

    this.subscription.add(
      this._windowResizeService.windowHeight$.subscribe((height) => {
        const navHeight = 210;

        const adjustedHeight = Math.trunc(height) - navHeight;
        this.windowHeight.set(adjustedHeight);

        let calculatedPageSize = this.pageSize();
        if (this.speechItems && this.speechItems.first) {
          const itemHeight = this.speechItems.first.nativeElement.offsetHeight;
          if (itemHeight) {
            calculatedPageSize = Math.floor(this.windowHeight() / itemHeight);
          }
        }

        this.pageSize.set(calculatedPageSize > 0 ? calculatedPageSize : 1);

        this.setDataPages(1);
        this.currentPage$.next(1);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onPageChange(page: number) {
    this.currentPage$.next(page);
    this.setDataPages(page);
  }

  setDataPages(startPage: number, endPage: number = this.pageSize()) {
    this._speechService.getSpeechDataSubjectPaginated(startPage, endPage).subscribe((response) => {
      this.paginatedSpeechData$.next(response);
      this.totalPages.set(Math.ceil(this._speechService.getCurrentSpeechDataSubject().length / this.pageSize()));
    });
  }

  onCardClick(id: string) {
    this.selectedSpeechId.set(id);
    if (this.windowWidth() < this.windowBreakPoint) this._modalService.openModal();
  }

  onSpeechDeleted() {
    this.clearSelectedSpeechId();
    if (this.windowWidth() < this.windowBreakPoint) this._modalService.closeModal();

    if (Object.values(this.searchSpeechComponent.searchForm.value).some((value) => value !== null)) {
      this._speechService.searchSpeech(this.searchSpeechComponent.searchForm.value as Speech);
    } else {
      this._speechService.manualSpeechSubjectNotify();
    }

    if (this.totalPages() === this.currentPage$.value - 1 && this.paginatedSpeechData$.value.length === 0) this.onPageChange(this.currentPage$.value - 1);
  }

  onSpeechSearch(speechSearch: Speech) {
    this.onPageChange(1);
    if (this.currentPage$.value !== 1) this.currentPage$.next(1);
    if (this.selectedSpeechId()) this.selectedSpeechId.set(undefined);
    this._speechService.searchSpeech(speechSearch);
  }

  clearSelectedSpeechId() {
    this.selectedSpeechId.set(undefined);
  }
}

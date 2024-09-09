import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Speech } from '../speech.model';
import { FormGroupType } from '../../core/utils';
import { WindowResizeService } from '../../core/service/window-resize.service';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { debounceTime, Subscription } from 'rxjs';
import { ModalService } from '../../shared/modal/modal.service';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-search-speech',
  standalone: true,
  imports: [ReactiveFormsModule, NgTemplateOutlet, AsyncPipe, ModalComponent],
  templateUrl: './search-speech.component.html',
  styleUrl: './search-speech.component.css',
  providers: [ModalService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchSpeechComponent implements OnInit, OnDestroy {
  constructor(
    private _windowResizeService: WindowResizeService,
    private _modalService: ModalService
  ) {}

  private subscription = new Subscription();

  searchSpeech = output<Speech>();
  windowWidth = signal<number>(0);

  searchForm = new FormGroup<FormGroupType<Partial<Speech>>>({
    subject: new FormControl(undefined),
    speech_date: new FormControl(undefined),
    author: new FormControl(undefined),
    date_created: new FormControl(undefined),
    date_updated: new FormControl(undefined)
  });

  get modalIsActive(): boolean {
    return this.windowWidth() > 700;
  }

  ngOnInit() {
    this.subscription.add(
      this._windowResizeService.windowWidth$.subscribe((width) => {
        this.windowWidth.set(Math.trunc(width));
      })
    );

    this.searchForm.valueChanges.pipe(debounceTime(200)).subscribe((formValues) => {
      this.searchSpeech.emit(formValues as Speech);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openSearchModal() {
    this._modalService.openModal();
  }
}

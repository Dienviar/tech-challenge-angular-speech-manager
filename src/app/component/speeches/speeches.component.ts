import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Speech } from '../../core/speech.model';
import { UpsertSpeechComponent } from '../upsert-speech/upsert-speech.component';
import { SpeechService } from '../../core/service/speech.service';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { WindowResizeService } from '../../core/service/window-resize.service';

@Component({
  selector: 'app-speeches',
  standalone: true,
  imports: [CommonModule, UpsertSpeechComponent, NgbAlertModule],
  templateUrl: './speeches.component.html',
  styleUrl: './speeches.component.css'
})
export class SpeechesComponent implements OnInit {
  constructor(
    private _speechService: SpeechService,
    private _windowResizeService: WindowResizeService
  ) {}

  selectedSpeechId = signal<number>(-1);

  currentPage = signal<number>(1);
  pageSize = 5;
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
      console.log(this.windowWidth());
    });
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
  }

  onCardClick(id: number) {
    this.selectedSpeechId.set(id);
  }
}

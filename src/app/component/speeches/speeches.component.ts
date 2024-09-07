import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { Speech } from '../../core/speech.model';
import { UpsertSpeechComponent } from '../upsert-speech/upsert-speech.component';
import { SpeechService } from '../../core/service/speech.service';

@Component({
  selector: 'app-speeches',
  standalone: true,
  imports: [CommonModule, UpsertSpeechComponent],
  templateUrl: './speeches.component.html',
  styleUrl: './speeches.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpeechesComponent implements OnInit {
  constructor(private _speechService: SpeechService) {}

  selectedSpeechId = signal<number>(-1);

  currentPage = signal<number>(1);
  pageSize = 5;

  get totalPages(): number {
    return Math.ceil(this._speechService.getAllSpeechesData.length / this.pageSize);
  }

  get pagedData(): Speech[] {
    const start = (this.currentPage() - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this._speechService.getAllSpeechesData.slice(start, end);
  }

  ngOnInit() {
    console.log(this._speechService.getAllSpeechesData);
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
  }

  onCardClick(id: number) {
    this.selectedSpeechId.set(id);
  }
}

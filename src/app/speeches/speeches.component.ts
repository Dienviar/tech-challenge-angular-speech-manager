import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { SpeechService } from '../speech.service';
import { Speech } from '../speech.model';

@Component({
  selector: 'app-speeches',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './speeches.component.html',
  styleUrl: './speeches.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpeechesComponent implements OnInit {
  constructor(private _speechService: SpeechService) {}

  selectedSpeech = signal<number | undefined>(undefined);

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
    this.selectedSpeech.set(id);
  }

  trackByName(index: number, item: Speech) {
    return item.name;
  }
}

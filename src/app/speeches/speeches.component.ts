import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { SpeechService } from '../speech.service';

@Component({
  selector: 'app-speeches',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './speeches.component.html',
  styleUrl: './speeches.component.css',
})
export class SpeechesComponent {
  constructor(private _speechService: SpeechService) {}

  selectedSpeech = signal<any>(true);

  currentPage = signal<number>(1);
  pageSize: number = 5;

  get totalPages(): number {
    return Math.ceil(
      this._speechService.getAllSpeechesData.length / this.pageSize
    );
  }

  get pagedData(): any[] {
    const start = (this.currentPage() - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this._speechService.getAllSpeechesData.slice(start, end);
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
  }

  onCardClick(name: number) {
    this.selectedSpeech.set(name);
  }

  trackByName(index: number, item: any) {
    return item.name;
  }
}

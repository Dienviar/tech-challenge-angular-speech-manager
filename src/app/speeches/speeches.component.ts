import { CommonModule } from '@angular/common';
import { Component, Signal, signal } from '@angular/core';

@Component({
  selector: 'app-speeches',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './speeches.component.html',
  styleUrl: './speeches.component.css',
})
export class SpeechesComponent {
  selectedSpeech = signal<any>(true);
  sampleData = [
    {
      id: 1,
      name: 'Speech 1',
    },
    {
      id: 2,
      name: 'Speech 1',
    },
    {
      id: 3,
      name: 'Speech 1',
    },
    {
      id: 4,
      name: 'Speech 1',
    },
    {
      id: 5,
      name: 'Speech 1',
    },
    {
      id: 6,
      name: 'Speech 1',
    },
    {
      id: 7,
      name: 'Speech 1',
    },

    {
      id: 8,
      name: 'Speech 1',
    },
    {
      id: 9,
      name: 'Speech 1',
    },
    {
      id: 10,
      name: 'Speech 1',
    },
  ];

  currentPage = signal<number>(1);
  pageSize: number = 5;

  get totalPages(): number {
    return Math.ceil(this.sampleData.length / this.pageSize);
  }

  get pagedData(): any[] {
    const start = (this.currentPage() - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.sampleData.slice(start, end);
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
  }

  trackByName(index: number, item: any) {
    return item.name;
  }

  onCardClick(name: number) {
    this.selectedSpeech.set(name);
  }
}

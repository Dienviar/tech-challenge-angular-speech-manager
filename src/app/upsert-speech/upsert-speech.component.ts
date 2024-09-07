import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-upsert-speech',
  standalone: true,
  imports: [],
  templateUrl: './upsert-speech.component.html',
  styleUrl: './upsert-speech.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpsertSpeechComponent {
  speechId = input.required<number>();
}

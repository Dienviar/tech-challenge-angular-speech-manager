import { Component, input, OnChanges, SimpleChanges } from '@angular/core';
import { SpeechService } from '../core/speech.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroupType } from '../core/utils';
import { Speech } from '../core/speech.model';
@Component({
  selector: 'app-upsert-speech',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './upsert-speech.component.html',
  styleUrl: './upsert-speech.component.scss'
})
export class UpsertSpeechComponent implements OnChanges {
  constructor(private _speechService: SpeechService) {}

  speechId = input.required<number>();

  speechForm = new FormGroup<FormGroupType<Speech>>({
    id: new FormControl(undefined),
    subject: new FormControl(undefined, Validators.required),
    author: new FormControl(undefined, Validators.required),
    content: new FormControl(undefined, Validators.required),
    date_created: new FormControl(undefined),
    date_updated: new FormControl(undefined),
    is_deleted: new FormControl(undefined),
    is_archived: new FormControl(undefined)
  });

  ngOnChanges(changes: SimpleChanges) {
    this.speechForm.patchValue(this._speechService.getAllSpeechById(changes['speechId'].currentValue));
  }

  onFormSubmit() {
    this._speechService.updateSpeech(this.speechForm.value as Speech);
  }
}

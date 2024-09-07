import { ChangeDetectionStrategy, Component, input, OnChanges, SimpleChanges } from '@angular/core';
import { SpeechService } from '../../core/service/speech.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroupType } from '../../core/utils';
import { Speech } from '../../core/speech.model';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService } from '../../core/service/confirmation.service';
import { Subscription, take } from 'rxjs';
@Component({
  selector: 'app-upsert-speech',
  standalone: true,
  imports: [ReactiveFormsModule, NgbAlert],
  templateUrl: './upsert-speech.component.html',
  styleUrl: './upsert-speech.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpsertSpeechComponent implements OnChanges {
  constructor(
    private _speechService: SpeechService,
    private _confirmationService: ConfirmationService
  ) {}

  private subscription = new Subscription();

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
    this._confirmationService.openDialog('Confirmation', 'Are you sure you want to update this speech?');
    this.subscription.add(
      this._confirmationService.dialogAccepted$.pipe(take(1)).subscribe(() => {
        this._confirmationService.dialogResult(this._speechService.updateSpeech(this.speechForm.value as Speech));
      })
    );
  }
}

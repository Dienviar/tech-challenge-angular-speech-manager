import { ChangeDetectionStrategy, Component, input, OnChanges, OnInit, output, signal, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroupType } from '../../core/utils';
import { Speech } from '../speech.model';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmationService } from '../../shared/confirmation-dialog/confirmation.service';
import { SpeechService } from '../speech.service';
import { ToastService } from '../../shared/toast/toast.service';
import { ResponseObj } from '../../core/interface';
import { ShareSpeechComponent } from '../share-speech/share-speech.component';
import { FormService } from '../../core/service/form.service';
@Component({
  selector: 'app-upsert-speech',
  standalone: true,
  imports: [ReactiveFormsModule, NgbAlert, ShareSpeechComponent],
  templateUrl: './upsert-speech.component.html',
  styleUrl: './upsert-speech.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpsertSpeechComponent implements OnInit, OnChanges {
  constructor(
    public _formService: FormService,
    private _speechService: SpeechService,
    private _confirmationService: ConfirmationService,
    private _router: Router,
    private _toastService: ToastService
  ) {}

  @ViewChild(ShareSpeechComponent) shareSpeechComponent!: ShareSpeechComponent;

  speechId = input<number>();
  fetchSpeech = signal<Speech | undefined>(undefined);
  speechDeleted = output<boolean>();

  currentDate?: string;

  speechForm = new FormGroup<FormGroupType<Speech>>({
    id: new FormControl(undefined),
    subject: new FormControl(undefined, Validators.required),
    speech_date: new FormControl(undefined, Validators.required),
    author: new FormControl(undefined, Validators.required),
    content: new FormControl(undefined, Validators.required),
    date_created: new FormControl(undefined),
    date_updated: new FormControl(undefined)
  });

  ngOnInit() {
    this.currentDate = new Date().toISOString().substring(0, 10);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['speechId'].currentValue !== -1) this.setFormValue(this._speechService.getAllSpeechById(changes['speechId'].currentValue));
    this.disableForm();
  }

  formSubmit() {
    this.speechForm.markAllAsTouched();
    if (!this.speechForm.valid) {
      this._toastService.toastMessage({ code: 400, message: 'Please fill all the required field', label: 'danger' } as ResponseObj);
      return;
    }

    this._confirmationService.openDialog('Confirmation', `Are you sure you want to ${this.speechId() ? 'update' : 'create'} this speech?`);

    if (this.speechId()) {
      this.speechForm.patchValue({
        date_updated: new Date()
      });

      this._confirmationService.dialogAccepted$.pipe(take(1)).subscribe(() => {
        this._toastService.toastMessage(this._speechService.updateSpeech(this.speechForm.value as Speech));
        this.disableForm();
      });
    } else {
      this.speechForm.patchValue({
        id: this._speechService.getCurrentSpeechData().values.length + 1,
        date_created: new Date(),
        date_updated: undefined
      });

      this._confirmationService.dialogAccepted$.pipe(take(1)).subscribe(() => {
        this._toastService.toastMessage(this._speechService.createSpeech(this.speechForm.value as Speech));
        this._router.navigateByUrl('/');
      });
    }
  }

  deleteSpeech() {
    this._confirmationService.openDialog('Confirmation', `Are you sure you want to delete this speech?`);
    this._confirmationService.dialogAccepted$.pipe(take(1)).subscribe(() => {
      this._toastService.toastMessage(this._speechService.deleteSpeech(this.speechId() as number));

      this.speechDeleted.emit(true);
    });
  }

  enableForm() {
    this.speechForm.enable();
  }

  disableForm() {
    this.speechForm.disable();
  }

  setFormValue(speech: Speech) {
    this.speechForm.patchValue({
      ...speech,
      speech_date: new Date(speech.speech_date).toISOString().substring(0, 10)
    });

    if (this.speechId()) this.fetchSpeech.set(speech);
  }

  revertFormValue() {
    this.setFormValue(this.fetchSpeech() as Speech);
    this.disableForm();
  }
}

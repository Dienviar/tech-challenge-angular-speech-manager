import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ModalService } from '../../shared/modal/modal.service';
import { NgFor } from '@angular/common';
import { SpeechService } from '../speech.service';
import { ToastService } from '../../shared/toast/toast.service';
import { ResponseObj } from '../../core/interface';
import { FormService } from '../../core/service/form.service';
import { ConfirmationService } from '../../shared/confirmation-dialog/confirmation.service';
import { switchMap, take } from 'rxjs';

@Component({
  selector: 'app-share-speech',
  standalone: true,
  imports: [ReactiveFormsModule, ModalComponent, NgFor],
  templateUrl: './share-speech.component.html',
  styleUrl: './share-speech.component.css',
  providers: [ModalService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShareSpeechComponent implements OnInit {
  constructor(
    public _formService: FormService,
    private _modalService: ModalService,
    private _speechService: SpeechService,
    private _toastService: ToastService,
    private _confirmationService: ConfirmationService
  ) {}

  shareForm = new FormGroup({
    emails: new FormArray([])
  });

  get emailFormArray(): FormArray {
    return this.shareForm.get('emails') as FormArray;
  }

  ngOnInit() {
    this.addControl();
  }

  addControl() {
    this.emailFormArray.push(
      new FormGroup({
        email: new FormControl(undefined, [Validators.required, Validators.email])
      })
    );
  }

  removeControl(index: number) {
    this.emailFormArray.removeAt(index);
  }

  openModal() {
    this._modalService.openModal();
  }

  shareSpeech() {
    this.emailFormArray.markAllAsTouched();

    if (!this.shareForm.valid) {
      this._toastService.toastMessage({ code: 400, message: 'Please fill all the required field', label: 'danger' } as ResponseObj);
      return;
    }

    this._confirmationService.openDialog('Confirmation', `Are you sure you want to share this speech with ${this.emailFormArray.value.length} recipient(s)?`);

    this._confirmationService.dialogAccepted$
      .pipe(
        take(1),
        switchMap(() => this._speechService.shareSpeech(this.emailFormArray.value as string[]))
      )
      .subscribe((response) => {
        this._toastService.toastMessage(response);
        this.closeModal();
      });
  }

  getFormGroup(index: number): FormGroup {
    return this.emailFormArray.controls[index] as FormGroup;
  }

  closeModal() {
    this.shareForm.reset();
    this._modalService.closeModal();
  }
}

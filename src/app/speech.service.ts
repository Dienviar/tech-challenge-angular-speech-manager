import { Injectable } from '@angular/core';
import { Speech } from './speech.model';

@Injectable({
  providedIn: 'root',
})
export class SpeechService {
  private speechData: Speech[] = [];

  get getAllSpeechesData(): Speech[] {
    return this.speechData;
  }
}

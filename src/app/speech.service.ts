import { Injectable } from '@angular/core';
import { Speech } from './speech.model';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  private speechData: Speech[] = [
    {
      id: 0,
      name: '',
      date_created: '',
      date_updated: '',
      is_deleted: false,
      is_archived: false
    }
  ];

  get getAllSpeechesData(): Speech[] {
    return this.speechData;
  }
}

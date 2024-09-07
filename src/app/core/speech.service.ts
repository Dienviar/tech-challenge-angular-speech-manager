import { Injectable } from '@angular/core';
import { Response, Speech } from './speech.model';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  private speechData: Speech[] = [
    {
      id: 0,
      subject: 'Speech 1',
      author: 'Author 1',
      content: 'testing',
      date_created: new Date(),
      date_updated: new Date(),
      is_deleted: false,
      is_archived: false
    },
    {
      id: 1,
      subject: 'Speech 2',
      author: 'Author 2',
      content: 'testing 2',
      date_created: new Date(),
      date_updated: new Date(),
      is_deleted: false,
      is_archived: false
    }
  ];

  get getAllSpeechesData(): Speech[] {
    return this.speechData;
  }

  getAllSpeechById(id: number): Speech {
    const speech = this.speechData.find((speech) => speech.id === id);
    if (!speech) {
      throw new Error(`Speech with id ${id} not found`);
    }
    return speech;
  }

  updateSpeech(speech: Speech): Response {
    const speechIndex = this.speechData.findIndex((obj) => obj.id === speech.id);
    if (speechIndex !== -1) {
      const updatedSpeech = { ...this.speechData[speechIndex], ...speech };
      this.speechData = [...this.speechData.slice(0, speechIndex), updatedSpeech, ...this.speechData.slice(speechIndex + 1)];
      return { code: 200, message: 'Speech updated', label: 'speech_updated' };
    } else {
      return { code: 404, message: 'Speech not found', label: 'speech_not_found' };
    }
  }
}

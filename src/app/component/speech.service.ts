import { Injectable } from '@angular/core';
import { Speech } from './speech.model';
import { ResponseObj } from '../core/interface';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  private speechData: Speech[] = [
    {
      id: 1,
      subject: 'Speech 1',
      speech_date: new Date('Sat Sep 07 2024 22:42:54 GMT+0800 (Philippine Standard Time)'),
      author: 'Author 1',
      content: 'testing',
      date_created: new Date('Sat Sep 07 2024 22:42:54 GMT+0800 (Philippine Standard Time)'),
      date_updated: new Date('Sat Sep 07 2024 22:42:54 GMT+0800 (Philippine Standard Time)'),
      is_deleted: false,
      is_archived: false
    },
    {
      id: 2,
      subject: 'Speech 2',
      speech_date: new Date('Sat Sep 06 2024 22:42:54 GMT+0800 (Philippine Standard Time)'),
      author: 'Author 2',
      content: 'testing 2',
      date_created: new Date('Sat Sep 06 2024 22:42:54 GMT+0800 (Philippine Standard Time)'),
      date_updated: new Date('Sat Sep 06 2024 22:42:54 GMT+0800 (Philippine Standard Time)'),
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

  createSpeech(speech: Speech): ResponseObj {
    if (this.speechData.push(speech)) {
      return { code: 200, message: 'Speech has been created', label: 'success' };
    }

    return { code: 404, message: 'Speech not found', label: 'danger' };
  }

  updateSpeech(speech: Speech): ResponseObj {
    const speechIndex = this.speechData.findIndex((obj) => obj.id === speech.id);
    if (speechIndex === -1) return { code: 404, message: 'Speech not found', label: 'danger' };

    const updatedSpeech = { ...this.speechData[speechIndex], ...speech };
    this.speechData = [...this.speechData.slice(0, speechIndex), updatedSpeech, ...this.speechData.slice(speechIndex + 1)];
    return { code: 200, message: 'Speech has been updated', label: 'success' };
  }

  deleteSpeech(id: number): ResponseObj {
    const speechIndex = this.speechData.findIndex((speech) => speech.id === id);

    if (speechIndex === -1) return { code: 404, message: 'Speech not found', label: 'danger' };

    this.speechData = this.speechData.filter((speech) => speech.id !== id);

    console.log(this.speechData);
    return { code: 200, message: 'Speech has been deleted', label: 'success' };
  }
}

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
      subject: 'The Power of Angular in Modern Web Development',
      speech_date: new Date('Sat Sep 07 2024 22:42:54 GMT+0800 (Philippine Standard Time)'),
      author: 'Denver Danniel Reyes',
      content: `Good morning, everyone!

Today, I want to introduce you to Angular, one of the most powerful frameworks for building modern web applications. Developed by Google, Angular provides developers with everything they need to create dynamic, scalable, and maintainable web apps.

One of its standout features is two-way data binding, which syncs the UI and the data model effortlessly, reducing repetitive code. Additionally, Angular uses dependency injection, helping us manage services and components more efficiently, making our apps modular and testable.

Angular’s strong ecosystem includes the Angular CLI, a command-line tool that simplifies development tasks like generating components and managing builds. Plus, Angular is built with TypeScript, which adds type safety and better tooling support, leading to fewer errors and cleaner code.

A big advantage is that Angular supports cross-platform development. With tools like Ionic or NativeScript, we can use the same codebase for web and mobile apps.

In summary, Angular offers a complete solution for web development. It's a framework that can grow with your project, from small apps to enterprise-level systems. If you haven't explored Angular yet, it's definitely worth your time!

Thank you!`,
      date_created: new Date('Sat Sep 07 2024 22:42:54 GMT+0800 (Philippine Standard Time)'),
      date_updated: new Date('Sat Sep 07 2024 22:42:54 GMT+0800 (Philippine Standard Time)'),
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

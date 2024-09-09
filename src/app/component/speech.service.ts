import { Injectable } from '@angular/core';
import { Speech } from './speech.model';
import { ResponseObj } from '../core/interface';
import { BehaviorSubject, map, Observable, of } from 'rxjs';

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
      date_updated: new Date('Sat Sep 07 2024 22:42:54 GMT+0800 (Philippine Standard Time)')
    },
    {
      id: 2,
      subject: 'Speech on JavaScript',
      speech_date: new Date('Sat Sep 09 2024 12:30:54 GMT+0800 (Philippine Standard Time)'),
      author: 'Denver Danniel Reyes',
      content: `Today, I want to talk to you about one of the most influential programming languages of the modern web: JavaScript.

JavaScript is everywhere. Whether you're browsing social media, shopping online, or checking your bank balance, JavaScript is the force behind many of the dynamic and interactive elements you see on the web. From humble beginnings as a simple scripting language introduced in 1995, it has evolved into a cornerstone of web development, powering everything from small websites to complex, large-scale applications.`,
      date_created: new Date('Sat Sep 08 2024 8:30:54 GMT+0800 (Philippine Standard Time)'),
      date_updated: undefined
    },
    {
      id: 3,
      subject: 'Hard Work',
      speech_date: new Date('Sat Sep 10 2024 8:30:54 GMT+0800 (Philippine Standard Time)'),
      author: 'Steve Jobs',
      content: `Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do.`,
      date_created: new Date('Sat Sep 09 2024 8:30:54 GMT+0800 (Philippine Standard Time)'),
      date_updated: undefined
    }
  ];

  private speechSubject: BehaviorSubject<Speech[]> = new BehaviorSubject<Speech[]>(this.speechData);
  public speechData$: Observable<Speech[]> = this.speechSubject.asObservable();

  getCurrentSpeechData(): Speech[] {
    return this.speechSubject.getValue();
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

    this.speechSubject.next(this.getCurrentSpeechData().filter((speech) => speech.id !== id));

    return { code: 200, message: 'Speech has been deleted', label: 'success' };
  }

  searchSpeech(speechSearch: Speech) {
    const refinedSpeechSearch = Object.fromEntries(Object.entries(speechSearch).filter((attr) => attr[1] !== null));

    const filteredSpeechData = this.speechData.filter((speech) => {
      return Object.entries(refinedSpeechSearch).every(([key, value]) => {
        const speechKey = key as keyof typeof speech;
        if (speechKey in speech) {
          if (speechKey === 'subject' || speechKey === 'author') {
            return speech[speechKey].toLowerCase().includes(value.toLowerCase());
          }
          if (speechKey === 'speech_date' || speechKey === 'date_created') {
            return new Date(speech[speechKey]).toISOString().substring(0, 10).includes(value);
          }
          return speech[speechKey] === value;
        }
        return false;
      });
    });

    this.speechSubject.next(filteredSpeechData);
  }

  shareSpeech(emails: string[]): Observable<ResponseObj> {
    return of(emails).pipe(
      map((emailList: string[]) => {
        if (emailList.length === 0) {
          return {
            code: 400,
            message: 'No email addresses provided',
            label: 'danger'
          } as ResponseObj;
        }

        return {
          code: 200,
          message: `Speech has been shared with ${emailList.length} recipient(s)`,
          label: 'success'
        } as ResponseObj;
      })
    );
  }
}

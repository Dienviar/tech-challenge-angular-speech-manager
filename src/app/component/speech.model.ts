export interface Speech {
  id: string;
  subject: string;
  speech_date: Date | string;
  author: string;
  content: string;
  date_created: Date;
  date_updated: Date | undefined;
}

export type SpeechDataSortState = ['date_created', 'asc'] | ['date_created', 'desc'] | ['speech_date', 'asc'] | ['speech_date', 'desc'];

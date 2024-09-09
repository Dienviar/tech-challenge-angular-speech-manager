export interface Speech {
  id: number;
  subject: string;
  speech_date: Date | string;
  author: string;
  content: string;
  date_created: Date;
  date_updated: Date | undefined;
}

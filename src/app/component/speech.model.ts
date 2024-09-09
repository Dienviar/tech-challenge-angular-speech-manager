export interface Speech {
  id: string;
  subject: string;
  speech_date: Date | string;
  author: string;
  content: string;
  date_created: Date;
  date_updated: Date | undefined;
}

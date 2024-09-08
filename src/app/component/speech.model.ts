export interface Speech {
  id: number;
  subject: string;
  speech_date: Date | string;
  author: string;
  content: string;
  date_created: Date;
  date_updated: Date | undefined;
  is_deleted: boolean;
  is_archived: boolean;
}

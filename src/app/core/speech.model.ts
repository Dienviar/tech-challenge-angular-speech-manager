export interface Speech {
  id: number;
  subject: string;
  author: string;
  content: string;
  date_created: Date;
  date_updated: Date;
  is_deleted: boolean;
  is_archived: boolean;
}

export interface Response {
  code: number;
  message: string;
  label: string;
}

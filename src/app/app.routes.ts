import { Routes } from '@angular/router';
import { UpsertSpeechComponent } from './component/upsert-speech/upsert-speech.component';
import { ListSpeechComponent } from './component/list-speech/list-speech.component';

export const routes: Routes = [
  { path: '', component: ListSpeechComponent },
  { path: 'create', component: UpsertSpeechComponent }
];

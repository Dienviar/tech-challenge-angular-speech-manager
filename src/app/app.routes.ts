import { Routes } from '@angular/router';
import { SearchSpeechComponent } from './component/search-speech/search-speech.component';
import { UpsertSpeechComponent } from './component/upsert-speech/upsert-speech.component';
import { ListSpeechComponent } from './component/list-speech/list-speech.component';

export const routes: Routes = [
  { path: '', component: ListSpeechComponent },
  { path: 'upsert', component: UpsertSpeechComponent },
  { path: 'search', component: SearchSpeechComponent }
];

import { Routes } from '@angular/router';
import { SpeechesComponent } from './component/speeches/speeches.component';
import { SearchSpeechComponent } from './component/search-speech/search-speech.component';
import { UpsertSpeechComponent } from './component/upsert-speech/upsert-speech.component';

export const routes: Routes = [
  { path: '', component: SpeechesComponent },
  { path: 'upsert', component: UpsertSpeechComponent },
  { path: 'search', component: SearchSpeechComponent }
];

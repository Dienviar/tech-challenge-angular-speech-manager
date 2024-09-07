import { Routes } from '@angular/router';
import { SpeechesComponent } from './speeches/speeches.component';
import { SearchSpeechComponent } from './search-speech/search-speech.component';
import { UpsertSpeechComponent } from './upsert-speech/upsert-speech.component';

export const routes: Routes = [
  { path: '', component: SpeechesComponent },
  { path: 'upsert', component: UpsertSpeechComponent },
  { path: 'search', component: SearchSpeechComponent }
];

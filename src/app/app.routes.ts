import { Routes } from '@angular/router';
import { SpeechesComponent } from './speeches/speeches.component';
import { CreateSpeechComponent } from './create-speech/create-speech.component';
import { SearchSpeechComponent } from './search-speech/search-speech.component';

export const routes: Routes = [
  { path: '', component: SpeechesComponent },
  { path: 'create', component: CreateSpeechComponent },
  { path: 'search', component: SearchSpeechComponent },
];

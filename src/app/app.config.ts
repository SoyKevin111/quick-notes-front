import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';

import { routes } from './app.routes';
import { notesReducer } from './store/notes/note.reducer';
import { provideEffects } from '@ngrx/effects';
import { NoteEffects } from './store/notes/note.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideHttpClient(),
  provideStore({notes:notesReducer}),
  provideEffects([NoteEffects]),
  //provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode })
  ]
};

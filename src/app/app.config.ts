import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { notesReducer } from './store/notes/note.reducer';
import { provideEffects } from '@ngrx/effects';
import { NoteEffects } from './store/notes/note.effects';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ReactiveFormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  ReactiveFormsModule,
  provideHttpClient(),
  provideStore({notes:notesReducer}),
  provideEffects([NoteEffects]), provideAnimationsAsync(), provideAnimationsAsync(),
  //provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode })
  ]
};

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Note } from '../store/notes/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private apiUrl = 'http://localhost:8080/notes';
  private http = inject(HttpClient);

  constructor() { }

  getNotes(): Observable<Note[]> {
    const cachedNotes = localStorage.getItem('notes');
    if (cachedNotes && cachedNotes !== '[]') {
      console.log("desde el storage");
      return of(JSON.parse(cachedNotes));
      
    }
    else {
      return this.http.get<Note[]>(this.apiUrl).pipe(
        tap((notes) => {
          console.log("desde el backend.");
          localStorage.setItem('notes', JSON.stringify(notes));
        })
      );
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Note } from '../models/note.model';


@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private apiUrl = 'http://localhost:8080/entity/request';
  private http = inject(HttpClient);

  constructor() { }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl + '/notes').pipe(
      tap(() => {
        console.log("Notes desde el Backend.");
      })
    );
  }

  createNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.apiUrl + '/notes', note);
  }

  updateNote(note: Note): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}/notes/${note.id}`, note);
  }

  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/notes/${id}`);
  }
  
  extractProtocol(state: string): number | null {
    const match = state.match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
  }
}

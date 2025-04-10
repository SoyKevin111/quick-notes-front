import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EmojiService } from '../../services/emoji.service';
import { loadNoteById, Note } from '../../store/notes';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-form-notes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-notes.component.html',
  styleUrl: './form-notes.component.scss'
})
export class FormNotesComponent implements OnInit {

  private store = inject(Store)
  private route = inject(ActivatedRoute);
  private router = inject(Router); // Inyecta el Router
  private emojiService = inject(EmojiService);

  //antes de la suscripcion, se suscribe en el template con async pipe
  noteSelected$: Observable<Note> = this.store.select('notes').pipe(
    map(state => (
      { ...state.note, emojiRef: this.emojiService.getEmojiPath(state.note.emojiRef) }
    ))
  );

  isUpdate: boolean = this.route.snapshot.url.some(segment => segment.path === 'update');

  ngOnInit(): void {
    const noteId = this.route.snapshot.paramMap.get('id');
    if (noteId) {
      this.store.dispatch(loadNoteById({ id: +noteId }));
    }

  }

  update() {
    this.router.navigate(['/notes']);
  }

  toMain() {
    this.router.navigate(['/notes']);
  }


}

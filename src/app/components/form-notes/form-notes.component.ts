import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { EmojiService } from '../../services/emoji.service';
import { loadNoteById, Note, updateNote, updateNoteSucess } from '../../store/notes';

@Component({
  selector: 'app-form-notes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-notes.component.html',
  styleUrl: './form-notes.component.scss'
})
export class FormNotesComponent implements OnInit {

  private store = inject(Store)
  private route = inject(ActivatedRoute);
  private router = inject(Router); // Inyecta el Router
  private emojiService = inject(EmojiService);

  noteUpdated: Note = {
    id: 0,
    title: '',
    description: '',
    emojiRef: ''
  }

  noteOriginal: Note | null = null;

  noSpacesPattern = '^(?!\\s*$).+';

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
      this.noteSelected$
        .pipe(take(1))
        .subscribe((note: Note) => {
          if (note) {
            this.noteUpdated = { ...note }
            this.noteOriginal = { ...note };
          }
        });
    }

  }

  update(form: NgForm) {
    if (form.valid && this.noteOriginal) {
      const { title, description } = this.noteUpdated;
      const noChange = title === this.noteOriginal.title && description === this.noteOriginal.description;
      if (!noChange) {
        this.store.dispatch(updateNote({ updateNote: this.noteUpdated }))
      }
    }
    this.router.navigate(['/notes']);
  }
  toMain() {
    this.router.navigate(['/notes']);
  }


}

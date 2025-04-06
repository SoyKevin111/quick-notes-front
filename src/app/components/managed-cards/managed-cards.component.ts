import { Component, inject, OnInit } from '@angular/core';
import { CardNoteComponent } from '../card-note/card-note.component';
import { RouterModule } from '@angular/router';
import { Note } from '../../store/notes/note.model';
import { Store } from '@ngrx/store';
import { loadNotes } from '../../store/notes/note.actions';

@Component({
  selector: 'app-managed-cards',
  standalone: true,
  imports: [CardNoteComponent, RouterModule],
  templateUrl: './managed-cards.component.html',
  styleUrl: './managed-cards.component.scss'
})
export class ManagedCardsComponent implements OnInit {

  private store = inject(Store);

  notes$: Note[] = [];
  noteSelected$: any;
  

  ngOnInit(): void {
    this.store.dispatch(loadNotes());

    this.store.select('notes').subscribe(state => {
      this.notes$ = state.notes;
      this.noteSelected$ = state.noteSelected;
    });
  }

}

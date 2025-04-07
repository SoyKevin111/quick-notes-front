import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { findNoteById, Note, resetNote } from '../../store/notes';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

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

  noteSelected: Note = {
    id: 0,
    title: 'JAAJAJAJ dede el form',
    description: '',
    emojiRef: ''
  }

  ngOnInit(): void {
    this.store.dispatch(resetNote());
    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');
      if (id > 0) {
        this.store.dispatch(findNoteById({ id }));
      }
    });

    this.store.select('notes').subscribe(state => {
      this.noteSelected = { ...state.note };
    });
  }

}

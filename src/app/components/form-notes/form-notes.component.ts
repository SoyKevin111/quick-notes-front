import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EmojiService } from '../../services/emoji.service';
import { loadNoteById, Note } from '../../store/notes';

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

  noteSelected: Note = {
    title: 'JAAJAJAJ dede el form',
    description: '',
    emojiRef: ''
  }

  emojiPath = '';

  ngOnInit(): void {
    //this.store.dispatch(resetNote());
    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0');
      if (id > 0) {
        this.store.dispatch(loadNoteById({ id }));
      }
    });

    this.store.select('notes').subscribe(state => {
      this.noteSelected = { ...state.note };
      this.emojiPath = this.emojiService.getEmojiPath(this.noteSelected.emojiRef);
    });
  }

  toMain() {
    this.router.navigate(['/notes']);
  }


}

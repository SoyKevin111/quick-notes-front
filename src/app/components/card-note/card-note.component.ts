import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { removeSelectedNote, selectNote, selectSelectedNoteId } from '../../store/notes';
import { LimitTextPipe } from '../../pipes/limit-text.pipe';
import { EmojiService } from '../../services/emoji.service';

const pipes = [LimitTextPipe];

@Component({
  selector: 'app-card-note',
  standalone: true,
  imports: [CommonModule, pipes],
  templateUrl: './card-note.component.html',
  styleUrl: './card-note.component.scss'
})
export class CardNoteComponent implements OnInit {

  store = inject(Store);
  @Input() note: any;
  private emojiService = inject(EmojiService);

  idSelected: number | null = null;
  emojiPath:string = '';
  randombg:string = '';

  ngOnInit(): void {
    this.store.select(selectSelectedNoteId).subscribe(id => {this.idSelected = id;});
    this.emojiPath = this.emojiService.getEmojiPath(this.note.emojiRef);
    this.randombg  = this.emojiService.getEmojiRandomBg();
  }

  selectedNote() {
    if (this.idSelected === this.note.id) {
      this.store.dispatch(removeSelectedNote());
    }
    else {
      this.store.dispatch(selectNote({ noteSelectedId: this.note.id }));
    }
  }


  get selected(): boolean {
    return this.note.id === this.idSelected;
  }

}

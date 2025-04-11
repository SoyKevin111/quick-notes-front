import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { EmojiType } from '../../../models/emoji-type.enum';
import { ModalService } from '../../../services/modal.service';
import { createNote, Note, removeSelectedNote } from '../../../store/notes';

@Component({
  selector: 'app-modal-create-notes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-create-notes.component.html',
  styleUrl: './modal-create-notes.component.scss'
})
export class ModalCreateNotesComponent implements OnInit {

  private store = inject(Store)
  private modalService = inject(ModalService);
  private _fb = inject(FormBuilder);

  @Input() message: string = '';

  //ReactiveForm
  createNoteForm = this._fb.group(
    {
      title: ['',
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern(/^(?!\s*$).+/)
        ]
      ],
      emojiRef: ['', [Validators.required]],
      description: ['',
        [
          Validators.required,
          Validators.maxLength(250),
          Validators.pattern(/^(?!\s*$).+/)
        ]
      ]
    }
  );

  animationState = 'modal-animate-in';
  emojiOptions = Object.values(EmojiType);

  ngOnInit(): void {
    this.store.dispatch(removeSelectedNote());
  }


  onSubmit() {
    if (this.createNoteForm.valid) {
      const note: Note = {
        title: this.createNoteForm.get('title')?.value ?? '',
        description: this.createNoteForm.get('description')?.value ?? '',
        emojiRef: this.createNoteForm.get('emojiRef')?.value ?? ''
      };
      console.log(this.createNoteForm.value);
      this.store.dispatch(createNote({ newNote: note }));
      this.close();
      this.createNoteForm.reset();
    }
  }

  close() {
    this.animationState = 'modal-animate-out';
    setTimeout(() => {
      this.modalService.close();
    }, 150);
  }

}

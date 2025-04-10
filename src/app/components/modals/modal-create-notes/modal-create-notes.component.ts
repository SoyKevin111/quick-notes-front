import { Component, inject, Inject, Input, OnInit } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createNote, Note, removeSelectedNote } from '../../../store/notes';
import { EmojiType } from '../../../models/emojiType.enum';

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
          Validators.maxLength(200),
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

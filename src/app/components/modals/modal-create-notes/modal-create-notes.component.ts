import { Component, inject, Inject, Input, OnInit } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createNote, Note, removeSelectedNote, selectSelectedNoteId } from '../../../store/notes';

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
      title: ['', [Validators.required]],
      emojiRef: ['', [Validators.required]],
      description: ['', [Validators.required]]
    }
  );

  animationState = 'modal-animate-in';

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

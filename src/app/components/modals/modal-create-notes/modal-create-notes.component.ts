import { Component, inject, Inject, Input, OnInit } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createNote, Note, selectSelectedNoteId } from '../../../store/notes';

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

  private noteSelectedId$ = this.store.select(selectSelectedNoteId);
  private hasId: boolean = false;//create

  @Input() modalVisible: boolean = false;
  @Input() message: string = '';

  //ReactiveForm
  createNoteForm: FormGroup;
  private _fb = inject(FormBuilder);

  animationState = 'modal-animate-in';

  ngOnInit(): void {
    this.noteSelectedId$.subscribe(id => {
      if (id > 0) {
        this.hasId = true;
      }
    })
  }

  constructor() {
    this.createNoteForm = this._fb.group(
      {
        title: ['', [Validators.required]],
        emojiRef: ['', [Validators.required]],
        description: ['', [Validators.required]]
      }
    )
  }

  onSubmit() {
    if (this.createNoteForm.valid) {
      const note: Note = {
        title: this.createNoteForm.get('title')?.value,
        description: this.createNoteForm.get('description')?.value,
        emojiRef: this.createNoteForm.get('emojiRef')?.value
      }
      console.log(note);
      if (!this.hasId) { //create
        this.store.dispatch(createNote({ newNote: note }))
      }
      this.close();
      this.createNoteForm.reset();
    }
  }

  close() {
    this.animationState = 'modal-animate-out';
    setTimeout(() => {
      this.modalVisible = false;
      this.modalService.close();
    }, 150); // ⏱️ ajusta al tiempo de tu animación CSS
  }

}

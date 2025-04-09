import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { ModalService } from '../../services/modal.service';
import { Note, removeSelectedNote, resetLoadNote, selectSelectedNoteId } from '../../store/notes';
import { CardNoteComponent } from '../card-note/card-note.component';
import { ModalCreateNotesComponent } from '../modals/modal-create-notes/modal-create-notes.component';


@Component({
  selector: 'app-managed-cards',
  standalone: true,
  imports: [CardNoteComponent, RouterModule, CommonModule],
  templateUrl: './managed-cards.component.html',
  styleUrl: './managed-cards.component.scss'
})
export class ManagedCardsComponent implements OnInit {

  private modalService = inject(ModalService);
  private store = inject(Store);
  selectedNoteId$ = this.store.select(selectSelectedNoteId);

  selectedNoteId: number | null = null;
  notes$: Note[] = [];


  ngOnInit(): void {

    this.store.dispatch({ type: '[App principal] Notas desde el backend' })
    this.resetStateInitial();
    this.store.select('notes').subscribe(state => {
      this.notes$ = state.notes;
    });

    this.selectedNoteId$.subscribe(id => {
      this.selectedNoteId = id;
    })
  }

  resetStateInitial() {
    this.store.dispatch(resetLoadNote());
    this.store.dispatch(removeSelectedNote())
  }

  createNoteModal() {
    this.store.dispatch(removeSelectedNote());
    this.modalService.open(ModalCreateNotesComponent)
  }


}

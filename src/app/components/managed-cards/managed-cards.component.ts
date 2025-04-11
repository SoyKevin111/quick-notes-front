import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
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
export class ManagedCardsComponent implements OnInit, OnDestroy {

  private modalService = inject(ModalService);
  private store = inject(Store);
  selectedNoteId: number | null = null;
  notes$: Note[] = [];
  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.store.dispatch({ type: '[App principal] Notas desde el backend' });
    this.resetStateInitial();

    this.subscriptions.push(
      this.store.select('notes').subscribe(state => {
        this.notes$ = state.notes;
      }),
      this.store.select(selectSelectedNoteId).subscribe(id => {
        this.selectedNoteId = id;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  resetStateInitial() {
    this.store.dispatch(resetLoadNote());
    this.store.dispatch(removeSelectedNote());
  }

  createNoteModal() {
    this.store.dispatch(removeSelectedNote());
    this.modalService.open(ModalCreateNotesComponent);
  }
}

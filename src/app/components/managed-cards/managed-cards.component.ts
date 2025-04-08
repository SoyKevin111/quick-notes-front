import { Component, inject, OnInit } from '@angular/core';
import { CardNoteComponent } from '../card-note/card-note.component';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadNotes, removeSelectedNote, selectSelectedNoteId, Note } from '../../store/notes';
import { CommonModule} from '@angular/common';
import { ModalService } from '../../services/modal.service';
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
    this.store.dispatch(removeSelectedNote());
    this.store.dispatch(loadNotes());

    this.store.select('notes').subscribe(state => {
      this.notes$ = state.notes;
    });

    this.selectedNoteId$.subscribe(id => {
      this.selectedNoteId = id;
    })
  }

  createNoteModal() {
    this.store.dispatch(removeSelectedNote());
    this.modalService.open(ModalCreateNotesComponent, { message: 'Hola desde el Managed-cards-component' })//modalVisible: true,
  }


}

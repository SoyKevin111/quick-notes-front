import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Note, selectSelectedNoteId } from '../../store/notes';

@Component({
  selector: 'app-card-note',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-note.component.html',
  styleUrl: './card-note.component.scss'
})
export class CardNoteComponent implements OnInit {

  store = inject(Store);
  @Input() note: any;

  idSelected: number | null = null;
  //destroyed$ = new Subject<void>();

  ngOnInit(): void {
    this.store.select(selectSelectedNoteId)
      //.pipe(takeUntil(this.destroyed$))
      .subscribe(id => {
        this.idSelected = id;
      });
  }

/*   ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  } */

  get selected(): boolean {
    return this.note.id === this.idSelected;
  }

}

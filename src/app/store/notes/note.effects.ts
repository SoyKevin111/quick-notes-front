import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { NoteService } from "../../services/note.service";
import { createNoteSucess, loadNotes, loadNotesFailure, loadNotesSucess } from "./note.actions";
import { catchError, exhaustMap, map, mergeMap, of, tap } from "rxjs";
import { Note } from "./note.model";
import { Store } from "@ngrx/store";


@Injectable()
export class NoteEffects {

	private actions$ = inject(Actions);
	private noteService = inject(NoteService);
	private store = inject(Store);

	constructor() { }

	//Efecto para persistir en cada cambio del state de reducer al localstorage.
	persisToLocalStorage$ = createEffect(
		() =>
			this.store.select('notes').pipe(
				// Escuchar la acción de éxito
				ofType(createNoteSucess),
				tap(() => {
					this.store.select('notes').subscribe(state => {
						localStorage.setItem('notes', JSON.stringify(state.notes));
					});
				})
			),
		{ dispatch: false }
	);

	loadNote$ = createEffect(
		() => this.actions$.pipe(
			ofType(loadNotes),
			exhaustMap(() => this.noteService.getNotes()
				.pipe(
					map((notes: Note[]) => {
						return loadNotesSucess({ notes });
					}),
					catchError((error) => of(loadNotesFailure({ error: error.message })))
				)
			)

		)
	);

}
import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { NoteService } from "../../services/note.service";
import { createNote, createNoteFailure, createNoteSucess, loadNotes, loadNotesFailure, loadNotesSucess } from "./note.actions";
import { catchError, exhaustMap, map, mergeMap, of, switchMap, tap } from "rxjs";
import { Note } from "../../models/note.model";
import { Store } from "@ngrx/store";
import Swal from "sweetalert2";


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
					ofType(loadNotes,createNoteSucess),
					tap(() => {
						this.store.select('notes').subscribe(state => {
							localStorage.setItem('notes', JSON.stringify(state.notes));
						});
					})
				),
			{ dispatch: false }
		);
	
/* 	persisToLocalStorages$ = createEffect(
		() =>
			this.store.select('notes').pipe(
				tap((state) => {
					localStorage.setItem('notes', JSON.stringify(state.notes));
				}
				)
			),
		{ dispatch: false }
	);
 */
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

	createNote$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(createNote),
				switchMap(({ newNote }) => {
					return this.noteService.createNote(newNote)
						.pipe(
							map((createdNote) => {
								return createNoteSucess({ newNote: createdNote });
							}),
							catchError((error) => {
								const errorMessage = error.error?.message || 'Error al crear la nota';
								return of(createNoteFailure({ error: errorMessage }));
							})
						)
				})

			)
	)



	//Efectos

	createNoteSucess$ = createEffect(
		() =>
			this.actions$
				.pipe(
					ofType(createNoteSucess),
					tap(() => {
						Swal.fire({
							title: "SAVED",
							text: "note created successfully.",
							icon: "success"
						});
					})
				), { dispatch: false }
	)

}
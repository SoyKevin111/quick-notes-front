import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { catchError, distinctUntilChanged, EMPTY, filter, map, of, skipWhile, switchMap, tap } from "rxjs";
import Swal from "sweetalert2";
import { LocalStorageService } from "../../services/local-storage.service";
import { NoteService } from "../../services/note.service";
import { createNote, createNoteFailure, createNoteSucess, loadNotesFailure, loadNotesSucess, loadState } from "./note.actions";


@Injectable()
export class NoteEffects {

	private actions$ = inject(Actions);
	private noteService = inject(NoteService);
	private localStorageService = inject(LocalStorageService);
	private store = inject(Store);

	constructor() { }

	//siempre cargara las notas desde el backend en el componente de gestion de notas :D
	loadNotesAlways$ = createEffect(() =>
		this.actions$.pipe(
			ofType('[App principal] Notas desde el backend'),
			switchMap(() => {
				return this.noteService.getNotes().pipe(
					map((notes) => loadNotesSucess({ notes })),
					catchError((error) => of(loadNotesFailure({ error })))
				);
			})
		)
	);

	//captura el state con notas vacias, y le agrega las notas del local storage
	restoreStateByStore$ = createEffect(() =>
		this.store.pipe(
			select('notes'),
			filter((state) => !state || state.notes.length === 0), // Si el estado está vacío
			switchMap(() => {
				const savedState = this.localStorageService.getState();
				if (savedState && savedState.notes.length > 0) {
					return of(loadState({ savedState }));
				}
				return EMPTY;
			})
		)
	);

	persistToLocalStorage$ = createEffect( //escucha los cambios del state y los guarda en localstorage
		() =>
			this.store.pipe(
				select('notes'),
				skipWhile((state) => !state || state.notes.length === 0), //ignora hasta que deje se cumplirse la condicion
				distinctUntilChanged(),
				tap((state) => this.localStorageService.saveState(state))
			),
		{ dispatch: false }
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
								const errorStatus: string = error.error?.status || 'Status Error'
								const errors: any = error.error?.errors || [];
								const firstError: string = errors.length > 0 ? errors[0] : '';
								return of(createNoteFailure({ status: errorStatus, description: firstError }));
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

	createNotefailure$ = createEffect(
		() =>
			this.actions$
				.pipe(
					ofType(createNoteFailure),
					tap(({ status, description }) => {
						Swal.fire(
							{
								title: "UNKNOWN_ERROR",
								text: description,
								footer: status,
								icon: "error"
							}
						);
					})
				), { dispatch: false }
	)

}


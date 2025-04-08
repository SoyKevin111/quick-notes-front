import { createAction, props } from "@ngrx/store";
import { Note } from "../../models/note.model";


//Note
export const loadNotes = createAction('[Note] Load Notes');
export const loadNotesSucess = createAction(
	'[Note] Loac notes sucess',
	props<{ notes: Note[] }>());

export const loadNotesFailure = createAction(
	'[Note] Loac notes failure',
	props<{ error: string }>());

export const selectNote = createAction(
	'[Note] Select note',
	props<{ noteSelectedId: number }>());

export const removeSelectedNote = createAction(
	'[Note] Remove Select Note'
);


//!methods

//?find Note
export const findNoteById = createAction(
	'[Note] Find note by id',
	props<{ id: number }>()
);

export const resetNote = createAction(
	'[Note] Load note selected'
)


//?create
export const createNote = createAction(
	'[Note] Create note',
	props<{ newNote: Note }>()
)
export const createNoteSucess = createAction(
	'[Note] Create note sucess',
	props<{ newNote: Note }>()
);
export const createNoteFailure = createAction(
	'[Note] Create note failure',
	props<{ error: string }>()
)

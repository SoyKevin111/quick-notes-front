import { createAction, props } from "@ngrx/store";
import { Note } from "../../models/note.model";
import { State } from "./note.reducer";


//state

// Acción para cargar el estado completo desde localStorage
export const loadState = createAction(
  '[Note] Load State',
  props<{ savedState: State }>()
);


//Note
export const loadNotesFromLocalStorage = createAction('[Notes] Load Notes from Local Storage');
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

//?find load Note
export const loadNoteById = createAction(
	'[Note] Find note by id',
	props<{ id: number }>()
);

export const resetLoadNote = createAction(
	'[Note] Load note selected'
)


//?Create
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
	props<{ status: string , description: string}>()
)

//?Update
export const updateNote = createAction(
	'[Note] Update note',
	props<{updateNote: Note}>()
)
export const updateNoteSucess = createAction(
	'[Note] Update note sucess',
	props<{updatedNote: Note}>()
)
export const updateNoteFailure = createAction(
	'[Note] update note failure',
	props<{ status: string , description: string}>()
)

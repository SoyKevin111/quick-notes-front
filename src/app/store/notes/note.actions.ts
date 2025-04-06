import { createAction, props } from "@ngrx/store";
import { Note } from "./note.model";


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
	props<{ noteSelected: Note }>());

//methods
export const createNoteSucess = createAction(
	'[Note] Create note sucess');
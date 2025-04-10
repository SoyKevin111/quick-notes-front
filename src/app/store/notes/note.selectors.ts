import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./note.reducer";

export const selectNotesState = createFeatureSelector<State>('notes');

//obtener el noteSelectedId
export const selectSelectedNoteId = createSelector(
	selectNotesState,
	(state: State) => state.noteSelectedId
);

export const loadNoteSelected = createSelector(
	selectNotesState,
	(state: State) => state.note
)

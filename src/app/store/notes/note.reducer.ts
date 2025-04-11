import { createReducer, on } from "@ngrx/store";
import { Note } from "../../models/note.model";
import { catchNoteFailure, createNoteSucess, deleteNoteSucess, loadNoteById, loadNotesSucess, loadState, removeSelectedNote, resetLoadNote, selectNote, updateNoteSucess } from "./note.actions";



export interface State {
  notes: Note[],
  noteSelectedId: number
  note: Note
}

export const initialState: State = {
  notes: [],
  noteSelectedId: 0,
  note: {
    title: 'Estado Inicial [TITLE]',
    description: `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ornare mollis semper. Nulla blandit imperdiet accumsan. Proin facilisis turpis posuere lacus sodales, eget tempus orci dapibus. 
    `,
    emojiRef: 'initial'
  }
}

export const notesReducer = createReducer(
  initialState,

  on(loadState, (state, { savedState }) => {
    return { ...savedState };
  }),

  on(loadNotesSucess, (state, { notes }) => {
    return { ...state, notes };
  }),
  on(selectNote, (state, { noteSelectedId }) => {
    console.log("Note selected: " + noteSelectedId);
    return {
      ...state,
      noteSelectedId
    };
  }),
  on(removeSelectedNote, (state) => {
    return { ...state, noteSelectedId: 0 };
  }),

  on(loadNoteById, (state, { id }) => {
    const note = state.notes.find(n => n.id === id) || initialState.note;
    return { ...state, note };
  }),

  on(resetLoadNote, (state) => {
    return { ...state, note: initialState.note };
  }),

  //! CRUD BACKEND

  //Create
  on(createNoteSucess, (state, { newNote }) => {
    return { ...state, notes: [...state.notes, { ...newNote }] };
  }),

  //Update
  on(updateNoteSucess, (state, { updatedNote }) => {
    return {
      ...state,
      notes: state.notes.map((note: Note) =>
        note.id === updatedNote.id ? { ...note, title: updatedNote.title, description: updatedNote.description } : note
      )
    };
  }),

  //Delete

  on(deleteNoteSucess, (state, { id }) => {
    return {
      ...state,
      noteSelectedId: 0,
      notes: state.notes.filter(note => note.id !== id)
    }
  }),

  on(catchNoteFailure, (state, { status, description }) => {
    console.log(`[Error Update] status: ${status} description: ${description}`);
    return { ...state };
  }),



);
import Dexie from 'dexie';
import { Note } from '../../types/note';

const db = new Dexie('NotesDatabase');
db.version(1).stores({
  notes: 'id,title,content', 
});

export const noteService = {
  getAllNotes: async (): Promise<Note[]> => {
    return db.notes.toArray(); 
  },

  addNote: async (note: Note): Promise<void> => {
    await db.notes.add(note); 
  },

  updateNoteContent: async (id: string, content: string): Promise<void> => {
    await db.notes.update(id, { content }); 
  },

  deleteNote: async (id: string): Promise<void> => {
    await db.notes.delete(id); 
  },
};

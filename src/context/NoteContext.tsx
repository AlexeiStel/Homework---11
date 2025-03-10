import React, { createContext, useContext, useEffect, useState } from 'react';
import { Note } from '../features/types/note';
import { noteService } from '../features/notes/services/noteService';

interface NoteContextType {
  notes: Note[];
  filteredNotes: Note[];
  selectedNote: Note | null;
  selectNote: (id: string) => void;
  createNote: () => void;
  updateNoteContent: (id: string, content: string) => void;
  updateNoteTitle: (id: string, title: string) => void;
  deleteNote: (id: string) => void;
  setFilteredNotes: (notes: Note[]) => void;
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const useNotes = () => useContext(NoteContext)!;

export const NoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>(notes);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    const loadNotes = async () => {
      const savedNotes = await noteService.getAllNotes();
      setNotes(savedNotes);
    };
    loadNotes();
  }, []);

  const createNote = async () => {
    const newNote = { id: Date.now().toString(), title: `Новая заметка ${Date.now().toString()}`, content: '' };
    await noteService.addNote(newNote);
    const updatedNotes = await noteService.getAllNotes()
    setNotes(updatedNotes);
    setFilteredNotes(updatedNotes);
    setSelectedNote(newNote);
  };

  const selectNote = (id: string) => {
    setSelectedNote(notes.find((note) => note.id === id) || null);
  };

  const updateNoteContent = (id: string, content: string) => {
    const updatedNotes = notes.map((n) => (n.id === id ? { ...n, content } : n));
    setNotes(updatedNotes);
    setFilteredNotes(updatedNotes);
  };

  const updateNoteTitle = (id: string, title: string) => {
    const updatedNotes = notes.map((n) => (n.id === id ? { ...n, title } : n));
    setNotes(updatedNotes);
    setFilteredNotes(updatedNotes);
    if (selectedNote?.id === id) {
      setSelectedNote({ ...selectedNote, title });
    }
  };

  const deleteNote = async (id: string) => {
    await noteService.deleteNote(id);
    const updatedNotes = await noteService.getAllNotes();
    setNotes(updatedNotes);
    setFilteredNotes(updatedNotes);
    setSelectedNote(null);
  };

return (
    <NoteContext.Provider value={{ notes, filteredNotes, selectedNote, selectNote, createNote, updateNoteContent, updateNoteTitle, deleteNote, setFilteredNotes }}>
      {children}
    </NoteContext.Provider>
  );
};

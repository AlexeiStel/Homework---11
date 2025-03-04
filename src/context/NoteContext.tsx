import React, { createContext, useContext, useState } from 'react';
import { Note } from '../features/types/note';

interface NoteContextType {
  notes: Note[];
  filteredNotes: Note[];
  selectedNote: Note | null;
  selectNote: (id: string) => void;
  createNote: () => void;
  updateNoteContent: (id: string, content: string) => void;
  deleteNote: (id: string) => void;
  setFilteredNotes: (notes: Note[]) => void;
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const useNotes = () => useContext(NoteContext)!;

export const NoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>(notes); 
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const createNote = () => {
    const newNote = { id: Date.now().toString(), title: `Новая заметка ${notes.length+1}`, content: '' };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes); 
    setFilteredNotes(updatedNotes); 
    setSelectedNote(() => newNote);
  };

  const selectNote = (id: string) => {
    setSelectedNote(notes.find((note) => note.id === id) || null);
  };

  const updateNoteContent = (id: string, content: string) => {
    const updatedNotes = notes.map((n) => (n.id === id ? { ...n, content } : n));
    setNotes(updatedNotes);
    setFilteredNotes(updatedNotes); 
  };

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter((n) => n.id !== id);
    setNotes(updatedNotes);
    setFilteredNotes(updatedNotes); 
    setSelectedNote(null);
  };

  return (
    <NoteContext.Provider value={{ notes, filteredNotes, selectedNote, selectNote, createNote, updateNoteContent, deleteNote, setFilteredNotes }}>
      {children}
    </NoteContext.Provider>
  );
};

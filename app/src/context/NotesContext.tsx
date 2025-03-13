import { createContext, useEffect, useState, ReactNode } from "react";
import {
  saveNote,
  getNotes,
  deleteNote,
  updateNote,
  updateTitle,
} from "../services/db.ts";

interface Note {
  id: string;
  title: string;
  content: string;
}

interface NotesContextType {
  notes: Note[];
  selectedNoteId: string | null;
  setSelectedNoteId: (id: string | null) => void;
  addNote: () => void;
  deleteNote: (id: string) => void;
  updateNote: (id: string, content: string) => void;
  updateTitle: (id: string, title: string) => void;
  setNotes: (notes: Note[]) => void;
}

export const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  useEffect(() => {
    getNotes().then(setNotes);
  }, []);

  const addNote = async () => {
    const newNote = { id: Date.now().toString(), title: "Новая заметка", content: "Текст новой заметки" };
    setNotes((prev) => [...prev, newNote]);
    setSelectedNoteId(newNote.id);
    await saveNote(newNote);
  };

  const deleteNoteHandler = async (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    setSelectedNoteId((prevId) => (prevId === id ? null : prevId));
    await deleteNote(id);
  };

  const updateNoteHandler = async (id: string, content: string) => {
    setNotes((prev) => prev.map((note) => (note.id === id ? { ...note, content } : note)));
    await updateNote(id, content);
  };

  const updateTitleHandler = async (id: string, title: string) => {
    setNotes((prev) => prev.map((note) => (note.id === id ? { ...note, title } : note)));
    await updateTitle(id, title); 
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        selectedNoteId,
        setSelectedNoteId,
        addNote,
        deleteNote: deleteNoteHandler,
        updateNote: updateNoteHandler,
        updateTitle: updateTitleHandler,
        setNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
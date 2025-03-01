import { createContext, useState, ReactNode } from "react";

interface Note {
  id: string;
  title: string;
  content: string;
}

interface NotesContextType {
  notes: Note[];
  selectedNoteId: string | null;
  setSelectedNoteId: (id: string) => void;
  addNote: () => void;
  deleteNote: (id: string) => void;
  updateNote: (id: string, content: string) => void;
}

export const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([
    { id: "1", title: "первый путь", content: "## Начните писать вашу заметку..." },
  ]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(notes[0]?.id || null);

  const addNote = () => {
    const newNote = { id: Date.now().toString(), title: "новая заметка", content: "Текст новой заметки" };
    setNotes([...notes, newNote]);
    setSelectedNoteId(newNote.id);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
    setSelectedNoteId(notes.length > 1 ? notes[0].id : null);
  };

  const updateNote = (id: string, content: string) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, content } : note)));
  };

  return (
    <NotesContext.Provider value={{ notes, selectedNoteId, setSelectedNoteId, addNote, deleteNote, updateNote }}>
      {children}
    </NotesContext.Provider>
  );
}

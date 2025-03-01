import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes должен использоваться внутри NotesProvider");
  }
  return context;
};

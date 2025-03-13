import { useState, useEffect } from "react";
import { Card } from "@mantine/core";
import MarkdownViewer from "../markdown-viewer/MarkdownViewer";
import MarkdownEditor from "../markdown-editor/MarkdownEditor";
import { useNotes } from "../../hooks/useNotes";

export default function Workspace() {
  const { notes, selectedNoteId, updateNote } = useNotes();
  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  const [content, setContent] = useState(selectedNote?.content || "## Начните писать вашу заметку...");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setContent(selectedNote?.content || "## Начните писать вашу заметку...");
  }, [selectedNoteId, selectedNote?.content]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsEditing(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleUpdateContent = (newContent: string) => {
    setContent(newContent);
    if (selectedNoteId) {
      updateNote(selectedNoteId, newContent);
    }
  };

  return (
    <Card shadow="sm" p="sm" style={{ height: "100%" }}>
      {isEditing ? (
        <MarkdownEditor value={content} onChange={handleUpdateContent} />
      ) : (
        <div onClick={() => setIsEditing(true)}>
          <MarkdownViewer content={content} />
        </div>
      )}
    </Card>
  );
}

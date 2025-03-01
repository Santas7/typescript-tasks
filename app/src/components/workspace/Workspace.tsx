import { useState, useEffect } from "react";
import { Card } from "@mantine/core";
import MarkdownViewer from "../markdown-viewer/MarkdownViewer";
import MarkdownEditor from "../markdown-editor/MarkdownEditor";

export default function Workspace() {
  const [content, setContent] = useState("## Начните писать вашу заметку...");
  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsEditing(false);
      }
    };
    
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Card shadow="sm" p="sm" style={{ height: "100%" }}>
      {isEditing ? (
        <MarkdownEditor value={content} onChange={setContent} />
      ) : (
        <div onClick={() => setIsEditing(true)}>
          <MarkdownViewer content={content} />
        </div>
      )}
    </Card>
  );
}

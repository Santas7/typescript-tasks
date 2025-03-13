import { useState } from "react";
import { Group, Text, Input } from "@mantine/core";
import { ListItemProps } from "../../types/types-interfaces";


export default function ListItem({ note, isSelected, onSelect, updateTitle }: ListItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

  const handleTitleSubmit = () => {
    if (title.trim() !== "") {
      updateTitle(note.id, title);
    }
    setIsEditing(false);
  };

  return (
    <Group
      onClick={(e) => {
        console.log("ListItem clicked, calling onSelect for:", note.id); 
        e.stopPropagation(); 
        onSelect();
      }}
      style={{
        cursor: "pointer",
        padding: "8px",
        backgroundColor: isSelected ? "#333" : "transparent",
        borderRadius: "5px",
      }}
    >
      {isEditing ? (
        <Input
          value={title}
          onChange={handleTitleChange}
          onBlur={handleTitleSubmit}
          onKeyPress={(e) => e.key === "Enter" && handleTitleSubmit()}
          autoFocus
        />
      ) : (
        <Text
          onDoubleClick={() => setIsEditing(true)}
          style={{ fontWeight: "bold" }}
        >{title}</Text>
      )}
    </Group>
  );
}
import { useState } from "react";
import { Card, Stack, ActionIcon, ScrollArea, Group, Text } from "@mantine/core";
import { Edit, Trash } from "react-feather";
import { useNotes } from "../../hooks/useNotes";
import ListItem from "../list-item/ListItem";
import SearchBox from "../search-box/SearchBox";
import ConfirmModal from "../confirm-modal/ConfirmModal";

export default function Sidebar() {
  const { notes, selectedNoteId, setSelectedNoteId, addNote, deleteNote } = useNotes();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card 
      withBorder 
      shadow="sm" 
      p="sm" 
      style={{ 
        display: "flex", 
        flexDirection: "column", 
        height: "100vh", 
        backgroundColor: "#1e1e1e", 
        color: "white" 
      }}
    >

      <Group position="apart" mb="sm">
        <SearchBox onSearch={setSearchQuery} />
        <Group>
          <ActionIcon variant="subtle" onClick={addNote} title="Новая заметка">
            <Edit size={18} />
          </ActionIcon>
          <ActionIcon variant="subtle" onClick={() => setIsConfirmOpen(true)} title="Удалить заметку">
            <Trash size={18} />
          </ActionIcon>
        </Group>
      </Group>

      <ScrollArea style={{ flex: 1 }}>
        <Stack spacing="xs">
          {filteredNotes.map((note) => (
            <ListItem 
              key={note.id} 
              note={note} 
              isSelected={note.id === selectedNoteId}
              onSelect={() => setSelectedNoteId(note.id)}
            />
          ))}
        </Stack>
      </ScrollArea>

      <ConfirmModal
        opened={isConfirmOpen}
        onConfirm={() => {
          if (selectedNoteId) {
            deleteNote(selectedNoteId);
          }
          setIsConfirmOpen(false);
        }}
      />
    </Card>
  );
}

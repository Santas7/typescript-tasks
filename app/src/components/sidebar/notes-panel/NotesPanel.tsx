import { ActionIcon, Group, ScrollArea, Stack, Text, Tooltip } from "@mantine/core";
import { FaPlus, FaTrash } from "react-icons/fa";
import ListItem from "../../list-item/ListItem";
import { Note, NotesPanelProps } from "../../../types/types-interfaces";


export default function NotesPanel({
    styles,
    section,
    addNote,
    selectedNoteId,
    filteredNotes,
    setSelectedNoteId,
    setIsConfirmOpen,
    updateTitle
}: NotesPanelProps) {
    return (
        <div className={styles.content}>
          {section === "notes" ? (
            <>
              <Group gap="xs" mb="md">
                <Tooltip label="Добавить заметку" withArrow>
                  <ActionIcon
                    variant="light"
                    color="blue"
                    size="lg"
                    radius="md"
                    onClick={addNote}
                  >
                    <FaPlus size={18} />
                  </ActionIcon>
                </Tooltip>

                <Tooltip label="Удалить заметку" withArrow>
                  <ActionIcon
                    variant="light"
                    color="red"
                    size="lg"
                    radius="md"
                    onClick={() => setIsConfirmOpen(true)}
                    disabled={!selectedNoteId}
                  >
                    <FaTrash size={18} />
                  </ActionIcon>
                </Tooltip>
              </Group>

              <ScrollArea style={{ flex: 1 }}>
                <Stack gap="xs">
                  {filteredNotes.map((note: Note) => (
                    <ListItem
                      key={note.id}
                      note={note}
                      isSelected={note.id === selectedNoteId}
                      onSelect={() => {
                        console.log("Selecting note:", note.id);
                        setSelectedNoteId(note.id);
                      }}
                      updateTitle={updateTitle}
                    />
                  ))}
                </Stack>
              </ScrollArea>
            </>
          ) : (
            <Text c="dimmed">Настройки пока не реализованы</Text>
          )}
        </div>
    )
}
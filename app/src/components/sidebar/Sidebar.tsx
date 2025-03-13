import { useState } from "react";
import {
  AppShell,
  ActionIcon,
  SegmentedControl,
  Text,
  Tooltip,
} from "@mantine/core";
import { FaSignOutAlt } from "react-icons/fa";
import styles from "./Sidebar.module.scss";
import ConfirmModal from "../confirm-modal/ConfirmModal";
import { useNotes } from "../../hooks/useNotes";
import { useAuth } from "../../hooks/useAuth";
import NotesPanel from "./notes-panel/NotesPanel";
import { SearchPanel } from "./search-panel/SearchPanel";


export default function Sidebar() {
  const { notes, selectedNoteId, setSelectedNoteId, addNote, deleteNote, updateTitle } = useNotes();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [section, setSection] = useState<"notes" | "settings">("notes");
  const { isAuthenticated, logout } = useAuth();

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCloseModal = () => setIsConfirmOpen(false);

  return (
    <AppShell
      navbar={{
        width: 320,           
        breakpoint: "sm",    
        collapsed: { mobile: false }, 
      }}
      padding="md"
    >
      <AppShell.Navbar p="md" className={styles.sidebar}>
        <div className={styles.header}>
          <Text fw={500} size="sm" className={styles.title} mb="xs">ANDREY'S APP:D</Text>

          {isAuthenticated && (
            <div className={styles.userInfo}>
              <div className={styles.userAvatar}></div>
              <div>
                <Text fw={500} size="sm" color="white">
                  Andrei
                </Text>
                <Text size="xs" color="#b0b0b0">
                  1@1
                </Text>
              </div>
              <Tooltip label="Выйти" withArrow>
                <ActionIcon
                  variant="filled"
                  color="red"
                  size="lg"
                  radius="md"
                  className={styles.logoutButton}
                  onClick={logout}
                >
                  <FaSignOutAlt size={18} />
                </ActionIcon>
              </Tooltip>
            </div>
          )}

          <SegmentedControl
            value={section}
            onChange={(value) => setSection(value as "notes" | "settings")}
            transitionTimingFunction="ease"
            fullWidth
            mt="md"
            data={[
              { label: "Заметки", value: "notes" },
              { label: "Настройки", value: "settings" },
            ]}
            className={styles.segmentedControl}
          />
        </div>

        <NotesPanel 
          styles={styles}
          section={section}
          addNote={addNote}
          selectedNoteId={selectedNoteId}
          filteredNotes={filteredNotes}
          setSelectedNoteId={setSelectedNoteId}
          setIsConfirmOpen={setIsConfirmOpen}
          updateTitle={updateTitle} 
        />

        <SearchPanel
          styles={styles}
          setSearchQuery={setSearchQuery}
        />

        <ConfirmModal
          opened={isConfirmOpen}
          onConfirm={() => {
            if (selectedNoteId) {
              deleteNote(selectedNoteId);
              setSelectedNoteId(null);
            }
            setIsConfirmOpen(false);
          }}
          onClose={handleCloseModal}
        />
      </AppShell.Navbar>
    </AppShell>
  );
}
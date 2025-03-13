export interface SearchBoxProps {
    onSearch: (query: string) => void;
}

export interface MarkdownViewerProps {
    content: string;
}

export interface MarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export interface Note {
    id: string;
    title: string;
    content: string;
}
  
export interface ListItemProps {
    note: Note;
    isSelected: boolean;
    onSelect: () => void;
    updateTitle: (id: string, newTitle: string) => void;
}

export interface NotesPanelProps {
    styles: Record<string, string>;
    section: string;
    addNote: () => void;
    selectedNoteId: string | null;
    filteredNotes: Note[];
    setSelectedNoteId: (id: string | null) => void;
    setIsConfirmOpen: (open: boolean) => void;
    updateTitle: (id: string, newTitle: string) => void;
}

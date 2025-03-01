import { Card, Text } from "@mantine/core";

interface ListItemProps {
  note: { id: string; title: string };
  isSelected: boolean;
  onSelect: () => void;
}

export default function ListItem({ note, isSelected, onSelect }: ListItemProps) {
  return (
    <Card
      shadow="sm"
      p="sm"
      onClick={onSelect}
      style={{
        cursor: "pointer",
        backgroundColor: isSelected ? "#48484A" : "#2C2C2E", // Выделение активного
        color: "white",
        borderRadius: "8px",
        transition: "background-color 0.2s ease",
      }}
    >
      <Text weight={500}>{note.title}</Text>
    </Card>
  );
}

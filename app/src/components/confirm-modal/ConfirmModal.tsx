import { Modal, Button, Group, Text } from "@mantine/core";

interface ConfirmModalProps {
  opened: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ConfirmModal({ opened, onConfirm, onClose }: ConfirmModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Подтверждение удаления"
      centered
      styles={{
        title: {
          color: "white",
        },
        root: {
          backgroundColor: "#2d2d2d",
          color: "white",
        },
      }}
    >
      <Text>Вы уверены, что хотите удалить эту заметку?</Text>
      <Group justify="right" mt="md">
        <Button color="red" onClick={onConfirm}>
          Удалить
        </Button>
        <Button variant="subtle" onClick={onClose} color="gray">
          Отмена
        </Button>
      </Group>
    </Modal>
  );
}
import { Modal, Button, Text } from "@mantine/core";

interface ConfirmModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({ opened, onConfirm }: ConfirmModalProps) {
  return (
    <Modal opened={opened} title="Подтверждение">
      <Text>Вы уверены, что хотите удалить заметку?</Text>
      <Button onClick={onConfirm} color="red" mt="md">
        Удалить
      </Button>
    </Modal>
  );
}

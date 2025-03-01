import { Button, Center, Stack, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Center style={{ height: "100vh" }}>
      <Stack align="center" spacing="md">
        <Text size="xl" weight={700} color="red">
          404 - Страница не найдена
        </Text>
        <Button onClick={() => navigate("/notes")} variant="filled" color="blue">
          Назад к заметкам
        </Button>
      </Stack>
    </Center>
  );
}

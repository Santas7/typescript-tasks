import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { TextInput, PasswordInput, Button, Container, Paper, Title, Alert } from "@mantine/core";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (auth.login(email, password)) {
      navigate("/notes");
    } else {
      setError("Неверный email или пароль!");
    }
  };

  return (
    <Container size={400} my={40}>
      <Paper shadow="md" p={30} radius="md" withBorder>
        <Title ta="center">Вход в систему</Title>
        {error && <Alert color="red">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            placeholder="Введите email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            mt="md"
          />
          <PasswordInput
            label="Пароль"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            mt="md"
          />
          <Button type="submit" fullWidth mt="xl">
            Войти
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
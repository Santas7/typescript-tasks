import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Login from "./pages/login-page/LoginPage";
import Notes from "./pages/notes-page/NotesPage";
import { AuthContext } from "./context/AuthContext";
import NotFoundPage from "./pages/not-found-page/NotFoundPage";


export default function App() {
  const auth = useContext(AuthContext);

  if (!auth) return null; 

  return (
    <Routes>
      <Route path="/login" element={auth.isAuthenticated ? <Navigate to="/notes" /> : <Login />} />
      <Route path="/notes" element={auth.isAuthenticated ? <Notes /> : <Navigate to="/login" />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

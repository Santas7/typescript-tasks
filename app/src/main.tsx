import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { BrowserRouter } from "react-router-dom";

import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { AuthProvider } from './context/AuthContext.tsx';
import { NotesProvider } from './context/NotesContext.tsx';


createRoot(document.getElementById('root')!).render(
  <MantineProvider>
    <BrowserRouter>
      <AuthProvider>
        <NotesProvider>
            <App />
        </NotesProvider>
      </AuthProvider>
    </BrowserRouter>
  </MantineProvider>
)

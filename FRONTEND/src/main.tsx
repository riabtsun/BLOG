import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import CssBaseline from "@mui/material/CssBaseline";
import './index.scss'

import "./index.scss";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
)

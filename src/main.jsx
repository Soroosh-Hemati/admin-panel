import React from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles';
import App from './App.jsx'
import theme from './theme';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);

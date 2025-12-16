import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (container) {
  try {
    // Clear any existing content
    container.innerHTML = '';
    
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("React Application Mounted Successfully.");
  } catch (e) {
    console.error("React Mount Error:", e);
    document.body.innerHTML = `<div style="padding:20px; color:red; font-family:sans-serif;">
      <h1>Errore Fatale</h1>
      <p>Impossibile avviare l'applicazione.</p>
      <pre style="background:#eee; padding:10px; border-radius:5px;">${e}</pre>
    </div>`;
  }
} else {
  console.error("Root element not found");
}
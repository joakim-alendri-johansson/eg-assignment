import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './main.css';

import App from './App.tsx';

async function enableMocking() {
  if (import.meta.env.MODE === 'msw') {
    const { worker } = await import('../mocking/msw.ts');

    document.title = '[MSW] ' + document.title;
    return worker.start({
      onUnhandledRequest(req) {
        if (req.url.startsWith('http://localhost:3000')) {
          //Requests to 3000 and 3001 are always ui development vite server itself, so always ignore.
          return;
        }
        console.warn('Unhandled: %s %s', req.method, req.url);
      },
    });
  }
  return Promise.resolve(undefined);
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  );
});

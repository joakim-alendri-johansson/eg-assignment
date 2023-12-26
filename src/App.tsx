import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import About from './Views/About';
import Interlude from './Views/Interlude';
import Header from './components/Header';
import StandardSearch from './Views/StandardSearch';
import ErrorNotice from './Views/ErrorNotice';

function App() {
  const [showInterlude, setShowInterlude] = useState<boolean>(true);
  const [dark, setDark] = useState<boolean>(true);

  return (
    <div
      className={`relative h-screen w-screen overflow-hidden ${
        dark ? 'dark' : ''
      }`}
    >
      <div
        className={`relative flex h-full w-full flex-col overflow-y-auto overflow-x-hidden bg-gradient-to-br from-background-50 to-background-400 dark:from-background-800 dark:to-background-950 dark:text-text-200`}
      >
        <Header dark={dark} setDark={setDark} />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/search/:id?" element={<StandardSearch />} />
          <Route path="*" element={<Navigate to="/search" />} />
        </Routes>
      </div>
      <ErrorNotice />
      {import.meta.env.MODE === 'msw' && (
        <Interlude
          show={showInterlude}
          onHide={() => setShowInterlude(false)}
        />
      )}
    </div>
  );
}

export default App;

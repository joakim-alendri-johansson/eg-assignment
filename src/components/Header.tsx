import React from 'react';
import {
  MoonIcon as MoonIconSolid,
  SunIcon as SunIconSolid,
} from '@heroicons/react/24/solid';
import {
  MoonIcon as MoonIconOutline,
  SunIcon as SunIconOutline,
} from '@heroicons/react/24/outline';

import NavBtn from './NavBtn';

interface HeaderProps {
  dark: boolean;
  setDark: (dark: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ dark, setDark }) => {
  return (
    <header className="w-screen text-text-700 dark:text-text-200">
      <nav className="flex items-center p-3 lg:px-8" aria-label="Global">
        <span className="basis-1/4 font-work text-3xl font-light">
          SWAPI Searcher
        </span>
        <div className="flex grow basis-1/2 items-center justify-center">
          <NavBtn to="/search">Search</NavBtn>
          <NavBtn to="/about">About</NavBtn>
        </div>
        <div className="flex shrink-0 basis-1/4 justify-end">
          <span className="isolate inline-flex rounded-md shadow-sm">
            <button
              type="button"
              className={`relative inline-flex items-center rounded-l-md border-r-transparent  px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-primary-500 ${
                !dark
                  ? 'bg-accent-50 text-accent-600'
                  : 'bg-transparent text-text-100'
              }`}
              onClick={() => setDark(false)}
            >
              {dark ? (
                <SunIconOutline className="h-6 w-6" />
              ) : (
                <SunIconSolid className="h-6 w-6" />
              )}
            </button>
            <button
              type="button"
              className={`relative -ml-px inline-flex items-center rounded-r-md border-l-transparent  px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-primary-500 ${
                dark
                  ? 'bg-primary-600 text-accent-100'
                  : 'bg-transparent text-text-700 hover:bg-secondary-800 hover:text-text-300'
              }`}
              onClick={() => setDark(true)}
            >
              {dark ? (
                <MoonIconSolid className="h-6 w-6" />
              ) : (
                <MoonIconOutline className="h-6 w-6" />
              )}
            </button>
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Header;

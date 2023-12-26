import React from 'react';
import { useFilmStore } from '../store/filmStore';

const ErrorNotice: React.FC = () => {
  const error = useFilmStore((state) => state.error);
  if (!error) {
    return null;
  }
  return (
    <div
      data-testid="error-notice"
      className="fixed left-0 top-0 flex h-screen w-screen flex-col items-center overflow-hidden bg-accent-200/70 p-24 dark:bg-accent-700/70"
    >
      <div className="h-full w-full rounded-lg bg-gradient-to-br from-accent-200 to-accent-400 p-5 dark:from-accent-600 dark:to-accent-800 dark:text-text-200">
        <h1 className="mt-10 w-2/3 max-w-4xl text-3xl font-thin">
          Oh no! There's been an error.
        </h1>
        <div className="mt-10 flex w-2/3 max-w-4xl flex-col gap-3 font-light text-text-200">
          <p>
            Unfortunately there has been a problem fetching data from the
            server, please reload to try again.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorNotice;

import React from 'react';
const FilmListSkeleton: React.FC = () => {
  return (
    <li className="relative flex w-full min-w-0 cursor-pointer items-center justify-between gap-x-3 py-4 pl-4 pr-2 hover:bg-primary-100 dark:hover:bg-secondary-800/70">
      <div className="flex grow flex-col gap-4 overflow-hidden">
        <div className="flex max-w-full justify-between gap-4">
          <div className="h-6 w-1/2 animate-pulse bg-background-300 dark:bg-background-700" />
          <div className="h-6 w-1/4 animate-pulse bg-background-300 dark:bg-background-700" />
        </div>
        <div className="flex shrink-0 items-center justify-between gap-3">
          <div className="h-4 w-2/3 animate-pulse bg-background-300 dark:bg-background-700" />
          <div className="h-4 w-1/4 animate-pulse bg-background-300 dark:bg-background-700" />
        </div>
      </div>
    </li>
  );
};

export default FilmListSkeleton;

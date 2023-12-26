import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

import { FilmAndDetails } from '../../types/Film';
import { numberToRomanNumeral } from '../../helpers/formatting';
import Rating from '../Rating';

interface FilmListEntryProps {
  selected: boolean;
  film: FilmAndDetails;
  onClick: () => void;
}

const FilmListEntry: React.FC<FilmListEntryProps> = ({
  selected,
  film,
  onClick,
}) => {
  return (
    <li
      className={`relative flex w-full min-w-0 cursor-pointer items-center justify-between gap-x-3 py-3 pl-4 pr-2 hover:bg-primary-100 dark:hover:bg-secondary-800/70 ${
        selected ? 'bg-primary-100 dark:bg-secondary-800/70' : ''
      }`}
      data-testid={'FilmListEntry-' + film.id}
      onClick={() => !selected && onClick()}
    >
      <div className="flex grow flex-col gap-2 overflow-hidden">
        <div className="flex max-w-full gap-4">
          <p className="grow truncate whitespace-nowrap text-sm font-semibold leading-6">
            {film.swapi.title}
          </p>
          <p className="whitespace-nowrap text-sm leading-6">
            Episode {numberToRomanNumeral(film.swapi.episode_id)}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <div className="grow">
            <Rating score={film.omdb.avg_rating} />
          </div>
          <p className="mt-1 truncate whitespace-nowrap text-xs leading-5 text-text-600 dark:text-text-300">
            {film.swapi.release_date.toFormat('yyyy-MM-dd')}
          </p>
        </div>
      </div>
      {!selected && (
        <ChevronRightIcon
          className="h-5 w-5 flex-none shrink-0 grow-0 text-text-400 dark:text-text-300"
          aria-hidden="true"
        />
      )}
    </li>
  );
};

export default FilmListEntry;

import React from 'react';

import FilmListEntry from './FilmListEntry';
import FilmListSkeleton from './FilmListSkeleton';
import { FetchedStatus } from '../../store/filmStore';
import { FilmAndDetails } from '../../types/Film';

interface FilmListProps {
  selected_id?: number;
  onSelect: (id: number) => void;
  films?: FilmAndDetails[];
  fetching_status: FetchedStatus;
}

const FilmList: React.FC<FilmListProps> = ({
  selected_id,
  onSelect,
  films,
  fetching_status,
}) => {
  return (
    <ul
      role="list"
      className="w-full divide-y divide-accent-100 dark:divide-accent-900"
      data-testid="film-list"
    >
      {fetching_status !== 'fetched' &&
        [1, 2, 3, 4].map((i) => <FilmListSkeleton key={i} />)}
      {films &&
        films.map((film) => (
          <FilmListEntry
            key={film.swapi.title}
            film={film}
            selected={film.id === selected_id}
            onClick={() => onSelect(film.id)}
          />
        ))}
    </ul>
  );
};

export default FilmList;

import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import Fuse from 'fuse.js';

import FilmList from '../components/FilmList/FilmList';
import FilmDetails from '../components/FilmDetails';
import { useFilmStore } from '../store/filmStore';
import SortingControls, {
  SortAndFilterOptions,
  SortingOptions,
} from '../components/SortingAndFilter';
import sortFilms from '../helpers/sortFilms';

const sorting_options: SortingOptions = [
  {
    value: 'episode',
    label: 'Episode number',
  },
  {
    value: 'rating',
    label: 'Average rating',
  },
  {
    value: 'release',
    label: 'Release date',
  },
  {
    value: 'title',
    label: 'Title',
  },
];

const StandardSearch: React.FC = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const [films_status, getFilms] = useFilmStore(
    useShallow((state) => [state.films_status, state.getFilms]),
  );
  const all_films = useFilmStore((state) => state.films);
  const selected_film = useMemo(() => {
    if (id) {
      const parsed_id = parseInt(id, 10);
      if (isFinite(parsed_id)) {
        return all_films.find((f) => f.id === parsed_id);
      }
    }
    return undefined;
  }, [all_films, id]);

  const [sort_and_filter, setSortAndFilter] = useState<SortAndFilterOptions>({
    sort: 'release',
    filter: '',
    order: 'asc',
  });

  useEffect(() => {
    if (films_status === 'unfetched') {
      getFilms();
    }
  }, [films_status, getFilms]);

  const film_fuse = useMemo(() => {
    return new Fuse(all_films, {
      threshold: 0.4,
      keys: ['swapi.title'],
    });
  }, [all_films]);

  const films = useMemo(() => {
    return sortFilms(all_films, sort_and_filter, film_fuse);
  }, [all_films, film_fuse, sort_and_filter]);

  const selected_is_visible = useMemo(() => {
    return (
      !!selected_film && films.findIndex((f) => f.id === selected_film.id) > -1
    );
  }, [films, selected_film]);

  return (
    <div className="grow animate-materialize opacity-0">
      <main className="isolate my-10 flex flex-col justify-center overflow-x-auto xl:flex-row">
        <div className="mb-3 w-full min-w-[985px] grow px-6 xl:mb-0 xl:min-w-fit xl:max-w-xs xl:grow-0 xl:pr-0">
          <div className="isolate w-full overflow-hidden rounded-lg border border-primary-400 bg-secondary-50/30 shadow-sm shadow-secondary-700/30 dark:border-primary-700 dark:bg-secondary-700/30 dark:shadow-md dark:shadow-secondary-700/50 xl:pb-2">
            <SortingControls
              selected={sort_and_filter}
              options={sorting_options}
              onChange={setSortAndFilter}
            />
          </div>
        </div>
        <div className="w-full min-w-[985px] max-w-7xl grow px-6 xl:w-fit xl:min-w-min">
          <div className="isolate flex w-full rounded-lg border border-primary-400 bg-secondary-50/30 shadow-md shadow-secondary-700/30 dark:border-primary-700 dark:bg-secondary-700/30 dark:shadow-lg dark:shadow-secondary-700/50">
            <div className="min-h-[500px] w-1/3 shrink-0 overflow-hidden rounded-lg border-r border-primary-400 bg-background-50 dark:border-primary-700 dark:bg-background-900/70">
              <FilmList
                selected_id={selected_film?.id}
                onSelect={(id) => nav('/search/' + id)}
                films={films}
                fetching_status={films_status}
              />
            </div>
            <div className="flex grow p-6">
              {!selected_film || !selected_is_visible ? (
                <div className="flex h-full grow items-center justify-center text-xl text-text-600 dark:text-text-400">
                  Select a film in the list to view its details
                </div>
              ) : (
                <FilmDetails film={selected_film} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StandardSearch;

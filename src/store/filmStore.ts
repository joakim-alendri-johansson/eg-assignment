import { create } from 'zustand';
import { FilmAndDetails } from '../types/Film';
import { getFilms } from '../api_client/swapi';
import { getDetails } from '../api_client/omdb';

export type FetchedStatus = 'unfetched' | 'fetched' | 'failed' | 'fetching';

export interface FilmStore {
  films: FilmAndDetails[];
  films_status: FetchedStatus;
  getFilms: () => void;

  error?: string;
  setError: (err?: string) => void;
}

export const useFilmStore = create<FilmStore>((set, get) => ({
  films: [],
  films_status: 'unfetched',

  getFilms: () => {
    const status = get().films_status;
    if (status === 'unfetched' || status === 'failed') {
      set({
        films_status: 'fetching',
      });
      getFilms()
        .then(async (swapi_films) => {
          const all_details = await Promise.all(
            swapi_films.map((f) => getDetails(f)),
          );

          const films = all_details.reduce<FilmStore['films']>(
            (acc, [film, details], i) => {
              acc.push({
                swapi: film,
                omdb: details,
                id: i,
              });
              return acc;
            },
            [],
          );
          set({
            films,
            films_status: 'fetched',
          });
        })
        .catch((err) => {
          set({
            films_status: 'failed',
            error: err,
          });
        });
    }
  },

  setError: (err) => set({ error: err }),
}));

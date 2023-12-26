import axios from 'axios';
import { DateTime } from 'luxon';

import { Film, FilmResponse, SerializedFilm } from '../types/Film';

export const deserialize = (serialized: SerializedFilm): Film => {
  return {
    ...serialized,
    release_date: DateTime.fromFormat(serialized.release_date, 'yyyy-MM-dd'),
  };
};

export const getFilms = async (): Promise<Film[]> => {
  const { data, status } = await axios.get<FilmResponse>(
    'https://swapi.dev/api/films/?format=json',
  );
  if (status !== 200) {
    throw status.toString();
  }
  return data.results.map(deserialize);
};

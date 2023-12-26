import { DateTime } from 'luxon';

////////////////////
///SWAPI
export interface SwapiMeta {
  /** ISO date string. */
  created: string;
  /** ISO date string. */
  edited: string;
  /** URL endpoint from where the data was fetched. */
  url: string;
}
export interface Film
  extends SwapiMeta,
    Record<
      'characters' | 'planets' | 'starships' | 'vehicles' | 'species',
      string[]
    > {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: DateTime;
}
export interface SerializedFilm extends Omit<Film, 'release_date'> {
  /** YYYY-MM-DD formatted date string. */
  release_date: string;
}

export interface SwapiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
export type FilmResponse = SwapiResponse<SerializedFilm>;

//////////////////////
///OMDB
export interface OMDBData
  extends Record<
    | 'Actors'
    | 'Awards'
    | 'BoxOffice'
    | 'Country'
    | 'Director'
    | 'DVD'
    | 'Genre'
    | 'imdbID'
    | 'imdbVotes'
    | 'Language'
    | 'Plot'
    | 'Poster'
    | 'Production'
    | 'Rated'
    | 'Released'
    | 'Response'
    | 'Runtime'
    | 'Title'
    | 'Type'
    | 'Website'
    | 'Writer'
    | 'Year',
    string
  > {
  Ratings: Record<'Source' | 'Value', string>[];
  /** Average ratings, 0..10 range. */
  avg_rating: number;
}
export interface SerializedOMDBData extends Omit<OMDBData, 'avg_rating'> {
  /** Integer x/100 */
  Metascore: string;
  /** Float x/10 */
  imdbRating: string;
}
export type OMDBDataResponse = SerializedOMDBData;

export interface FilmAndDetails {
  /** Simple index from the request response. */
  id: number;
  /** SWAPI data */
  swapi: Film;
  /** OMDB data */
  omdb: OMDBData;
}

import React from 'react';
import { numberToRomanNumeral } from '../helpers/formatting';
import { FilmAndDetails } from '../types/Film';
import Rating from './Rating';

interface FilmDetailsProps {
  film: FilmAndDetails;
}

const FilmDetails: React.FC<FilmDetailsProps> = ({ film }) => {
  return (
    <div className="flex w-full animate-materialize flex-col">
      <div className="mb-2 flex gap-2">
        <h1 className="flex items-center text-xl font-bold">
          <span className="mr-2 font-light text-text-600 dark:text-text-300">
            Episode {numberToRomanNumeral(film.swapi.episode_id)}
          </span>
          {film.swapi.title}
        </h1>
      </div>
      <div className="flex gap-3">
        <div className="flex grow">
          <p>{film.swapi.opening_crawl.substring(0, 800)}</p>
        </div>
        <div className="w-36 shrink-0 lg:w-44">
          <img src={film.omdb.Poster} className="mb-2 w-full shadow-sm" />
        </div>
      </div>
      <div className="mt-3 flex gap-3">
        <div className="flex grow basis-0 flex-col gap-2">
          <div>
            <p className="text-sm text-accent-600 dark:text-accent-300">
              Directing
            </p>
            <p>{film.omdb.Director}</p>
          </div>
          <div>
            <p className="text-sm text-accent-600 dark:text-accent-300">
              Writing
            </p>
            <p>{film.omdb.Writer}</p>
          </div>
          <div>
            <p className="text-sm text-accent-600 dark:text-accent-300">
              Actors
            </p>
            <p>{film.omdb.Actors}</p>
          </div>
          <div>
            <p className="text-sm text-accent-600 dark:text-accent-300">
              Awards
            </p>
            <p>{film.omdb.Awards}</p>
          </div>
        </div>
        <div className="flex grow basis-0 flex-col gap-2">
          <div className="mb-2 flex w-full flex-col">
            <Rating score={film.omdb.avg_rating} show_score />
          </div>
          {film.omdb.Ratings.map(({ Source, Value }) => (
            <div
              key={Source}
              className="flex rounded border border-accent-300 bg-secondary-100 p-2 text-accent-700 dark:border-accent-600 dark:bg-secondary-700/50 dark:text-accent-100"
            >
              {Source}
              <div className="flex grow justify-end font-semibold text-text-900 dark:text-text-100">
                {Value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilmDetails;

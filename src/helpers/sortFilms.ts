import Fuse from 'fuse.js';
import { SortAndFilterOptions } from '../components/SortingAndFilter';
import { FilmAndDetails } from '../types/Film';

const sortFilms = (
  all_films: FilmAndDetails[],
  sort_and_filter: SortAndFilterOptions,
  fuse: Fuse<FilmAndDetails>,
) => {
  const filtered = sort_and_filter.filter
    ? fuse.search(sort_and_filter.filter).map((fr) => fr.item)
    : [...all_films];

  filtered.sort((a, b) => {
    const invert = sort_and_filter.order === 'asc' ? 1 : -1;
    switch (sort_and_filter.sort) {
      case 'episode':
        return (a.swapi.episode_id - b.swapi.episode_id) * invert;
      case 'title':
        return (a.swapi.title < b.swapi.title ? 1 : -1) * invert;
      case 'rating': {
        return (a.omdb.avg_rating - b.omdb.avg_rating) * invert;
      }
      case 'release':
        return (a.swapi.release_date.year - b.swapi.release_date.year) * invert;
      default:
        throw new Error('Unimplemented sort option.');
    }
  });
  return filtered;
};

export default sortFilms;

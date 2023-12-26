import { describe, expect, test } from 'vitest';
import { numberToRomanNumeral } from './formatting';

import { films } from '../../mocking/data/swapi';
import { omdb_by_id, short_omdb, long_omdb } from '../../mocking/data/omdbapi';
import { deserialize as swapiDeserialize } from '../api_client/swapi';
import { deserialize as omdbDeserialize } from '../api_client/omdb';
import { FilmAndDetails } from '../types/Film';
import sortFilms from './sortFilms';
import Fuse from 'fuse.js';

const films_w_details: FilmAndDetails[] = films.results
  .map(swapiDeserialize)
  .map<FilmAndDetails>((f, i) => {
    const details =
      omdb_by_id[f.title] || f.title.length > 20 ? long_omdb : short_omdb;
    return {
      id: i,
      omdb: omdbDeserialize(details),
      swapi: f,
    };
  });

const fuse = new Fuse(films_w_details, {
  threshold: 0.4,
  keys: ['swapi.title'],
});

describe('Formatting tests', () => {
  test('Romanizing 0 should error', () => {
    expect(() => numberToRomanNumeral(0)).toThrowError('Out of range value');
  });
  test('Romanizing 1 should return I', () => {
    expect(numberToRomanNumeral(1)).toBe('I');
  });
  test('Romanizing string should error', () => {
    expect(() => numberToRomanNumeral('1' as unknown as number)).toThrowError(
      'Invalid parameter',
    );
  });

  test('Sort by title desc', () => {
    const sorted = sortFilms(
      films_w_details,
      { sort: 'title', filter: '', order: 'desc' },
      fuse,
    );
    expect(sorted[0].swapi.title).toBe('A New Hope');
  });
  test('Sort by title asc', () => {
    const sorted = sortFilms(
      films_w_details,
      { sort: 'title', filter: '', order: 'asc' },
      fuse,
    );
    expect(sorted[sorted.length - 1].swapi.title).toBe('A New Hope');
  });
  test('Filter by Ho shuld return 2', () => {
    const sorted = sortFilms(
      films_w_details,
      { sort: 'title', filter: 'Ho', order: 'desc' },
      fuse,
    );
    expect(sorted.length).toBeCloseTo(2);
  });
});

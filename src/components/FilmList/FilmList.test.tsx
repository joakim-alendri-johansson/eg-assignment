import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import FilmList from './FilmList';
import { films } from '../../../mocking/data/swapi';
import {
  omdb_by_id,
  short_omdb,
  long_omdb,
} from '../../../mocking/data/omdbapi';
import { deserialize as swapiDeserialize } from '../../api_client/swapi';
import { deserialize as omdbDeserialize } from '../../api_client/omdb';
import { FilmAndDetails } from '../../types/Film';

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

describe('Film list', () => {
  it('should render the list', async () => {
    const { getByTestId } = render(
      <FilmList
        onSelect={() => {}}
        fetching_status="fetched"
        films={films_w_details}
      />,
    );
    expect(getByTestId('film-list').children.length).toBe(
      films_w_details.length,
    );
  });
  it('should render skeleton list', async () => {
    const { getByTestId } = render(
      <FilmList onSelect={() => {}} fetching_status="fetching" />,
    );
    expect(getByTestId('film-list').children.length).toBe(4);
  });
  it('should trigger onSelect when clicking a list item', async () => {
    const onSelect = vi.fn();
    const { getByTestId } = render(
      <FilmList
        onSelect={onSelect}
        fetching_status="fetched"
        films={films_w_details}
      />,
    );
    await userEvent.click(
      getByTestId('FilmListEntry-' + films_w_details[0].id),
    );
    expect(onSelect).toHaveBeenCalledWith(0);
  });
  it('should not trigger onSelect when clicking selected list item', async () => {
    const onSelect = vi.fn();
    const { getByTestId } = render(
      <FilmList
        onSelect={onSelect}
        fetching_status="fetched"
        films={films_w_details}
        selected_id={0}
      />,
    );
    await userEvent.click(
      getByTestId('FilmListEntry-' + films_w_details[0].id),
    );
    expect(onSelect).toHaveBeenCalledTimes(0);
  });
});

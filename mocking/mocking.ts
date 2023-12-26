import { DefaultBodyType, http, HttpResponse, PathParams } from 'msw';
import { FilmResponse, OMDBDataResponse } from '../src/types/Film';
import { films } from './data/swapi';
import { long_omdb, omdb_by_id, short_omdb } from './data/omdbapi';

export const handlers = [
  http.get<PathParams<never>>(
    'https://m.media-amazon.com/images/M/*',
    async () => {
      const buffer = await fetch(`/mock/thumbnail.jpg`).then((response) =>
        response.arrayBuffer(),
      );
      return HttpResponse.arrayBuffer(buffer, {
        headers: {
          'Content-Type': 'image/jpeg',
        },
        status: 200,
      });
    },
  ),
  http.get<PathParams<never>, DefaultBodyType, FilmResponse>(
    'https://swapi.dev/api/films/',
    async () => {
      return HttpResponse.json(films, { status: 200 });
    },
  ),

  //Example: http://www.omdbapi.com/?apiKey=...&t=the+empire+strikes+back&y=1980&r=json
  //Best guess what the responses actually are for invalid queries etc.
  http.get<
    PathParams<never>,
    DefaultBodyType,
    OMDBDataResponse | 'Query parameter t must be specified.'
  >('https://www.omdbapi.com/', async ({ request }) => {
    const params = new URL(request.url).searchParams;
    const t = params.get('t');
    if (!t) {
      return HttpResponse.text('Query parameter t must be specified.', {
        status: 400,
      });
    }
    if (omdb_by_id[t]) {
      return HttpResponse.json(omdb_by_id[t], { status: 200 });
    }
    if (t.length > 20) {
      return HttpResponse.json(long_omdb, { status: 200 });
    }
    return HttpResponse.json(short_omdb, { status: 200 });
  }),
];

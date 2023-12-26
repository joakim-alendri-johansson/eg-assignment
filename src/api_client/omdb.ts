import axios from 'axios';
import {
  Film,
  OMDBData,
  OMDBDataResponse,
  SerializedOMDBData,
} from '../types/Film';

export const deserialize = (serialized: SerializedOMDBData): OMDBData => {
  const scores = [
    parseInt(serialized.Metascore, 10) / 10,
    parseFloat(serialized.imdbRating),
  ];
  const tomato_score = serialized.Ratings.find((r) =>
    r.Source.toLocaleLowerCase().startsWith('rotten'),
  );
  if (tomato_score) {
    scores.push(parseInt(tomato_score.Value, 10) / 10);
  }
  return {
    ...serialized,
    avg_rating: scores.reduce((acc, v) => acc + v, 0) / scores.length,
  };
};

export const getDetails = async (film: Film): Promise<[Film, OMDBData]> => {
  const { data, status } = await axios.get<OMDBDataResponse>(
    //API key should probably be fetched from a config somewhere...
    `https://www.omdbapi.com/?apiKey=b9a5e69d&t=${film.title.toLowerCase()}&y=${
      film.release_date.year
    }&r=json`,
  );

  if (status !== 200) {
    throw status.toString();
  }
  return [film, deserialize(data)];
};

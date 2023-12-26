import React from 'react';
import { StarIcon } from '@heroicons/react/20/solid';

interface RatingProps {
  score: number;
  show_score?: boolean;
}

const Rating: React.FC<RatingProps> = ({ score, show_score }) => {
  return (
    <>
      {show_score && (
        <p>
          Average rating: <span className="font-bold">{score.toFixed(1)}</span>{' '}
          / 10
        </p>
      )}
      <div className="flex items-center">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
          <StarIcon
            key={rating}
            className={`h-4 w-4 shrink-0 ${
              Math.round(score) >= rating
                ? 'text-yellow-500'
                : 'text-background-300'
            }`}
            aria-hidden="true"
          />
        ))}
      </div>
    </>
  );
};

export default Rating;
